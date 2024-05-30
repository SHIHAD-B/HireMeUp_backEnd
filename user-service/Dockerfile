FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

EXPOSE 4002

COPY . .

CMD [ "npm", "run", "start:dev" ]