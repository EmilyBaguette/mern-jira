FROM node:24-alpine
WORKDIR /opt

COPY package.json package-lock.json tsconfig.base.json ./
COPY apps/server/package.json ./apps/server/package.json
COPY apps/client/package.json ./apps/client/package.json

RUN npm ci
