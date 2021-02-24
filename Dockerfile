FROM node:12.13.0-alpine

RUN apk update && apk add build-base git python

COPY package.json .
COPY package-lock.json .
COPY ./src ./src
COPY ./dist ./dist
COPY ./resources ./resources
COPY ./spec ./spec

RUN npm install --production

EXPOSE 8433
ENV PORT 8433
ENV NODE_ENV production

CMD ["npm", "start:prod"]
