FROM node:16-alpine

RUN mkdir -p /usr/app/
WORKDIR /usr/app

COPY ./ ./
RUN npm i
RUN npm run build

EXPOSE 4000
CMD ["npm","start"]