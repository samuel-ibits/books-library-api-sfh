# Dockerfile for Admin API
FROM node:14

WORKDIR /admin/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000
CMD ["node", "admin-app.js"]
