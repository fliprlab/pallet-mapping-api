FROM node:16-alpine

RUN mkdir -p /usr/app/
WORKDIR /usr/app

COPY package.json .
RUN npm i

COPY . .
RUN npm run build

EXPOSE 4000
CMD ["npm","start"]