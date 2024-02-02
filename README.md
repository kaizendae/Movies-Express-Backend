## 1. Create a local mongodb instance in Docker.
`docker compose up -d` to start a local mongodb instance in docker.

## 2. Load the sample data into the local mongodb instance

`/bin/bash scripts/load-sample-data.sh sample-data` to load the sample data into your docker instance


In case you face the following error: 
``/bin/bash ./script.sh: line 18: mongoimport: command not found``

You need to install the MongoDB database tools. You can find it here:
https://www.mongodb.com/docs/database-tools/installation/installation-macos/

Successfull output should look like this:
```bash
/bin/bash scripts/load-sample-data.sh sample-data
Importing data from directory: sample-data
2024-02-02T17:16:51.733+0100    connected to: mongodb://localhost:27017/
2024-02-02T17:16:51.734+0100    dropping: movies-database.comments
2024-02-02T17:16:52.427+0100    50304 document(s) imported successfully. 0 document(s) failed to import.
2024-02-02T17:16:52.444+0100    connected to: mongodb://localhost:27017/
2024-02-02T17:16:52.444+0100    dropping: movies-database.movies
2024-02-02T17:16:53.457+0100    23539 document(s) imported successfully. 0 document(s) failed to import.
2024-02-02T17:16:53.470+0100    connected to: mongodb://localhost:27017/
2024-02-02T17:16:53.471+0100    dropping: movies-database.sessions
2024-02-02T17:16:53.477+0100    1 document(s) imported successfully. 0 document(s) failed to import.
2024-02-02T17:16:53.490+0100    connected to: mongodb://localhost:27017/
2024-02-02T17:16:53.490+0100    dropping: movies-database.theaters
2024-02-02T17:16:53.516+0100    1564 document(s) imported successfully. 0 document(s) failed to import.
2024-02-02T17:16:53.530+0100    connected to: mongodb://localhost:27017/
2024-02-02T17:16:53.530+0100    dropping: movies-database.users
2024-02-02T17:16:53.540+0100    185 document(s) imported successfully. 0 document(s) failed to import.

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