FROM guergeiro/pnpm:lts-latest-slim
LABEL authors="flurbudurbur"

COPY . .

RUN pnpm install

RUN pnpm run test
RUN pnpm run test:integration
RUN pnpm run test:unit


ENTRYPOINT ["top", "-b"]