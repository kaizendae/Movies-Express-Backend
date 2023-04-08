1. Create a local mongodb instance in Docker.
`docker run -d -p 27017:27017 --name movies-mongo mongo:latest`

        You're connection string is `mongodb://localhost:27017/?retryWrites=true&w=majority`
2. Clone this repo that helps us populate sample movies data

https://github.com/neelabalan/mongodb-sample-dataset

`cd mongodb-sample-dataset`

`./script.sh localhost 27017` to load the sample data into your docker instance
