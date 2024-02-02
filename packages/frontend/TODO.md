## 1. Figure it out (it ain't that hard).
After running the backend from the other repo as a container, figure out how to run the frontend as a container.

Start from package.json to understand how to start the app and build or run test.

You can try the following 3 options:
- Use a node Image and run the app with start command from package.json, this is not for production use. the other 2 options are production grade.
- Build the project with npm run build and serve the build folder with a container of a static server like nginx or apache.
- Use a multi-stage Dockerfile to build the project with a node image and then serve it with a container of a static server like nginx or apache. [HELP](https://medium.com/@alinaseri/dockerize-react-applications-with-nginx-17f752deb54)