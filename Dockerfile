FROM node:12.13.0-alpine

RUN apk update && apk add build-base git python

COPY package.json .
COPY package-lock.json .
COPY ./src ./src
COPY ./dist ./dist
COPY ./public ./public

RUN npm install

EXPOSE 8433

CMD ["npm", "prod"]