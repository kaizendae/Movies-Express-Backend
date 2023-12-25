## 1. Create a local mongodb instance in Docker.
`docker run -d -p 27017:27017 --name movies-mongo mongo:latest`

        You're connection string is `mongodb://localhost:27017/?retryWrites=true&w=majority`
## 2. Clone this repo that helps us populate sample movies data

https://github.com/neelabalan/mongodb-sample-dataset

`cd mongodb-sample-dataset`

`./script.sh localhost 27017` to load the sample data into your docker instance


In case you face the following error: 
``./script.sh: line 18: mongoimport: command not found``

You need to install the MongoDB database tools. You can find it here:
https://www.mongodb.com/docs/database-tools/installation/installation-macos/

Successfull output should look like this:
```bash
./script.sh localhost 27017
sample_mflix
2023-12-22T19:53:33.589+0100	connected to: mongodb://localhost:27017/
2023-12-22T19:53:33.590+0100	dropping: sample_mflix.comments
2023-12-22T19:53:34.334+0100	50304 document(s) imported successfully. 0 document(s) failed to import.
2023-12-22T19:53:34.352+0100	connected to: mongodb://localhost:27017/
2023-12-22T19:53:34.353+0100	dropping: sample_mflix.movies
2023-12-22T19:53:35.471+0100	23539 document(s) imported successfully. 0 document(s) failed to import.
2023-12-22T19:53:35.488+0100	connected to: mongodb://localhost:27017/
2023-12-22T19:53:35.488+0100	dropping: sample_mflix.sessions
2023-12-22T19:53:35.497+0100	1 document(s) imported successfully. 0 document(s) failed to import.
2023-12-22T19:53:35.511+0100	connected to: mongodb://localhost:27017/
2023-12-22T19:53:35.511+0100	dropping: sample_mflix.theaters
2023-12-22T19:53:35.541+0100	1564 document(s) imported successfully. 0 document(s) failed to import.
2023-12-22T19:53:35.554+0100	connected to: mongodb://localhost:27017/
2023-12-22T19:53:35.555+0100	dropping: sample_mflix.users
2023-12-22T19:53:35.564+0100	185 document(s) imported successfully. 0 document(s) failed to import.
```

## 3. create a Dockerfile for the movies app

Get inspired from https://itnext.io/lets-dockerize-a-nodejs-express-api-22700b4105e4

Create the Dockerfile. with the right CMD command to start the app.

Try to understand each line of the Dockerfile.

## 4. Build the docker image
```bash
docker build -t movies-backend:1.0 .
```

## 5. Run the docker image
```bash
docker run -d -p 5000:5000 --env-file=.env --name movies-backend movies-backend:1.0

# be careful with the env file. it should be in the same directory as the Dockerfile
# be careful with the IP adress of mongoDB in the .env file. it should be the IP address of your running mongo docker container
```

## 6. Test the app
```bash
# from your local machine since you used 5000:5000 in the docker run command this should work.
curl http://localhost:5000/healthcheck
```