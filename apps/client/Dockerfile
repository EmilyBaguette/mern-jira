FROM node:20-alpine AS build
WORKDIR /app

# Ensure pnpm is available in this stage
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

COPY ../../package.json ../../pnpm-lock.yaml ./
RUN pnpm fetch
COPY ../../ .
RUN pnpm -w build

FROM nginx:1.27-alpine AS runtime
COPY infra/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/apps/client/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
