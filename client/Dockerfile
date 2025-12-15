FROM node:20.11.1-alpine3.19 AS build

# Install dependencies + Build
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

RUN yarn build

# Nginx server? TODO: railway deployment
