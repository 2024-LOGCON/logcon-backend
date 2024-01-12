FROM node:18.19-alpine AS builder
ENV NODE_ENV production

RUN apk add --no-cache tzdata && \
    echo 'Etc/UTC' > /etc/timezone

WORKDIR /usr/src/app

COPY . .

RUN yarn install

RUN yarn build

FROM node:18.19-alpine

WORKDIR /app

COPY --from=builder /usr/src/app/dist /app/dist
COPY --from=builder /usr/src/app/.pnp.cjs /app/.pnp.cjs
COPY --from=builder /usr/src/app/.yarnrc.yml /app/.yarnrc.yml
COPY --from=builder /usr/src/app/.yarn /app/.yarn
COPY --from=builder /usr/src/app/package.json /app/package.json
COPY --from=builder /usr/src/app/yarn.lock /app/yarn.lock

EXPOSE 3000
ENV NODE_ENV production
CMD [ "yarn", "start:prod" ]