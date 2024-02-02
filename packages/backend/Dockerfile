FROM node:21-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install
EXPOSE 5000
CMD ["npm", "run", "start"]

# https://itnext.io/lets-dockerize-a-nodejs-express-api-22700b4105e4
