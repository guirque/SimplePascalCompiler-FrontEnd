FROM node:18-slim

WORKDIR /simplepascalfrontend/

COPY package*.json /simplepascalfrontend/

RUN npm install

COPY . /simplepascalfrontend/

CMD ["npm", "run", "dev"]