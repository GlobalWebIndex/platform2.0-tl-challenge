FROM node:lts-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY web/package.json ./
COPY web/yarn.lock ./

RUN yarn

COPY web ./

CMD ["yarn", "start"]