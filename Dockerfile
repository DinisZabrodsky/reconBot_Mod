FROM node:18-alpine

WORKDIR $NODE_WORKDIR

COPY ./package*.json ./


RUN npm install
COPY ./ ./



CMD ["npm", "run", "start"]