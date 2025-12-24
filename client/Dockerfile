FROM node:22-alpine AS build

# install dependencies + build
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

ENV PATH /app/node_modules/.bin:$PATH

COPY .env.example .env

COPY . .

RUN yarn build

# nginx server
FROM nginx:1.25.4-alpine3.18

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /var/www/html/

EXPOSE 5173

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
