
FROM node:18.14.1

WORKDIR /frontend

COPY ./package*.json ./
COPY ./package-lock.json ./

RUN npm install

COPY ./code/ ./



EXPOSE 5173

CMD npm run dev

