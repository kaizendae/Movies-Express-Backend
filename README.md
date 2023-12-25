1. Create a local mongodb instance in Docker.
`docker run -d -p 27017:27017 --name movies-mongo mongo:latest`

        You're connection string is `mongodb://localhost:27017/?retryWrites=true&w=majority`
2. Clone this repo that helps us populate sample movies data

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