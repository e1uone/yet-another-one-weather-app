FROM node:22.5.1-alpine3.19

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build