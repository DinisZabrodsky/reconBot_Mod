FROM node:18-alpine

WORKDIR $NODE_WORKDIR

COPY ./package*.json ./

RUN npm install
RUN npm install



CMD ["npm", "start"]