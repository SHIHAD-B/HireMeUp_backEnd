FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install typescript -g

RUN npm run build

EXPOSE 4006

COPY . .

CMD [ "npm", "run", "start" ]