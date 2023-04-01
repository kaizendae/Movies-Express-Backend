FROM node:16-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 5000
CMD ["npm", "run", "dev"]

# https://itnext.io/lets-dockerize-a-nodejs-express-api-22700b4105e4
