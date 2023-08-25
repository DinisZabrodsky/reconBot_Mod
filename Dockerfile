FROM node:18-alpine

WORKDIR $NODE_WORKDIR

COPY ./package*.json ./
COPY / /

RUN npm install
RUN npm install sharp@0.23.4



CMD ["npm", "run", "start"]