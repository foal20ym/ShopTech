FROM node:18.14.1

WORKDIR /backend

COPY ./package*.json ./
COPY ./package-lock.json ./

RUN npm install

COPY ./src/ ./

CMD node --watch ./src/app.js