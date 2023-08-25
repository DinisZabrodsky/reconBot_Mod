FROM node:18-alpine

WORKDIR $NODE_WORKDIR

COPY ./package*.json ./


RUN npm install
RUN npm install sharp@0.23.4
COPY ./ ./



CMD ["npm", "run", "start"]