FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

ENV NODE_ENV=production

RUN yarn build

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]