FROM node:16-alpine

RUN mkdir -p /usr/app/
WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY ./ ./
RUN yarn build

EXPOSE 4000
CMD ["npm","start"]