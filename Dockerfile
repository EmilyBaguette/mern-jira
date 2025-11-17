FROM node:24-alpine AS base
WORKDIR /opt

# Install any OS deps you need
RUN apk add --no-cache bash

COPY package.json package-lock.json tsconfig.base.json ./
COPY apps/server/package.json apps/server/package.json
COPY apps/client/package.json apps/client/package.json

RUN npm ci

FROM base AS dev
ENV NODE_ENV=development

# ------------------------
# Build client (Vite)
# ------------------------
FROM base AS build-client
ENV NODE_ENV=production

# Copy full source to build
COPY . .

# Build the client
RUN npm run build --prefix apps/client

# ------------------------
# Build server (Fastify)
# ------------------------
FROM base AS build-server
ENV NODE_ENV=production

COPY . .

# Build the server (to apps/server/dist)
RUN npm run build --prefix apps/server

# ------------------------
# Server runtime image
# ------------------------
FROM node:24-alpine AS server
WORKDIR /opt/apps/server
ENV NODE_ENV=production

# Install only server runtime dependencies
COPY apps/server/package*.json ./
RUN npm ci --omit=dev

# Copy built server code
COPY --from=build-server /opt/apps/server/dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]

# ------------------------
# Client runtime image (nginx)
# ------------------------
FROM nginx:stable-alpine AS client

# Copy the built Vite assets
COPY --from=build-client /opt/apps/client/dist /usr/share/nginx/html

# Optional: custom nginx config for SPA routing, etc.
# Place this in apps/client/nginx.conf
COPY apps/client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
