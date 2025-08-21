FROM guergeiro/pnpm:lts-latest-alpine AS tests-native
WORKDIR /app
COPY . .

# prepare environment
RUN apk add git
RUN pnpm install
RUN pnpm run check

RUN pnpm run test:unit

FROM node:lts-bookworm AS tests-playwright
WORKDIR /app
COPY --from=tests-native /app .

RUN npx -y playwright install --with-deps

RUN npm run test:integration

FROM guergeiro/pnpm:lts-latest AS builder
WORKDIR /app
COPY --from=tests-playwright /app .

RUN pnpm run format
