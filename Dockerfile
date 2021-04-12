FROM node:12.13.0-alpine

RUN apk update && apk add build-base git python

COPY . ./


RUN npm install
RUN npm run build
ENV NODE_ENV=production

COPY ./public ./dist/public

EXPOSE 8433

CMD ["node", "./dist/src/Server.js"]