FROM node:18-alpine

WORKDIR /

COPY ./package*.json ./

RUN npm install
RUN npm audit fix
RUN npm install

COPY ./ ./



CMD ["npm", "start"]