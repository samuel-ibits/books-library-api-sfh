# Dockerfile for Client API
FROM node:14

WORKDIR /client/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4001
CMD ["node", "app.js"]
