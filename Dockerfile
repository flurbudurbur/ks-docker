FROM guergeiro/pnpm:lts-latest-alpine AS tests-native
WORKDIR /app

# prepare environment
RUN apk add --no-cache git

COPY package.json pnpm-lock.yaml ./
RUN pnpm fetch
COPY . .

RUN pnpm install --offline --frozen-lockfile
RUN pnpm run check
RUN pnpm run test:unit

FROM node:lts-bookworm AS tests-playwright
WORKDIR /app
RUN npx -y playwright install --with-deps
RUN corepack enable && corepack prepare pnpm@15 --activate

COPY --from=tests-native /app .

RUN npm run test:integration

FROM guergeiro/pnpm:lts-latest AS builder
WORKDIR /app
COPY --from=tests-playwright /app .

RUN pnpm run format
