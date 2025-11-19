FROM node:24-alpine AS base
WORKDIR /opt

RUN corepack enable pnpm

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.base.json ./
COPY apps/server/package.json apps/server/package.json
COPY apps/client/package.json apps/client/package.json

RUN pnpm install --frozen-lockfile

FROM base AS dev
ENV NODE_ENV=development

COPY . .
CMD ["pnpm", "dev"]

FROM base AS build-client
ENV NODE_ENV=production

COPY . .
RUN pnpm --filter ./apps/client build

FROM base AS build-server
ENV NODE_ENV=production

COPY . .
RUN pnpm --filter ./apps/server build

FROM base AS prune-server-deps
ENV NODE_ENV=production

RUN pnpm prune --prod --filter ./apps/server

FROM node:24-alpine AS server
ENV NODE_ENV=production

WORKDIR /opt

COPY --from=prune-server-deps /opt/node_modules ./node_modules

COPY apps/server/package*.json ./apps/server/

COPY --from=build-server /opt/apps/server/dist ./apps/server/dist

WORKDIR /opt/apps/server

EXPOSE 3000
CMD ["node", "dist/index.js"]

FROM nginx:stable-alpine AS client

COPY --from=build-client /opt/apps/client/dist /usr/share/nginx/html

COPY apps/client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
