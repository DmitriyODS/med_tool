FROM node:18-alpine

WORKDIR /usr/src/medtool

COPY ${PWD}/back/package.json ./

RUN npm install

COPY ${PWD}/back .

ENTRYPOINT ["node", "app.js"]
