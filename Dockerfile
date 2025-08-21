FROM guergeiro/pnpm:lts-latest-alpine AS tests-native
LABEL authors="flurbudurbur"

WORKDIR /app

COPY . .

RUN pwd

# prepare environment
RUN apk add git
RUN pnpm install
RUN pnpm run check

RUN pnpm run test:unit

FROM node:lts-bookworm AS tests-playwright
LABEL authors="flurbudurbur"

WORKDIR /app

COPY --from=tests-native /tests .

RUN npx -y playwright@1.55.0 install --with-deps

RUN npm run test:integration

ENTRYPOINT ["top", "-b"]