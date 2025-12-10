FROM node:24-alpine AS base
WORKDIR /opt

RUN corepack enable pnpm

COPY package.json pnpm-lock.yaml tsconfig.base.json ./
COPY apps/server/package.json apps/server/package.json
COPY apps/client/package.json apps/client/package.json

RUN pnpm install --frozen-lockfile

FROM base AS build-client
ENV NODE_ENV=production
COPY . .
RUN pnpm --filter ./apps/client build

FROM base AS build-server
ENV NODE_ENV=production
COPY . .
RUN pnpm --filter ./apps/server build

FROM node:24-alpine AS server
WORKDIR /opt/apps/server
ENV NODE_ENV=production

COPY apps/server/package*.json ./
RUN npm install --omit=dev   # or copy pruned node_modules from base

COPY --from=build-server /opt/apps/server/dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]

FROM nginx:stable-alpine AS client
COPY --from=build-client /opt/apps/client/dist /usr/share/nginx/html
COPY apps/client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
