
FROM node:14

RUN npm install -g nodemon

RUN mkdir -p /usr/src/app


WORKDIR /usr/src/app


COPY package.json /usr/src/app



RUN npm install


COPY . .

EXPOSE 3000

CMD ["nodemon", "server.js"]