# Start from the official Node.js image
FROM node:21-alpine

# Set the working directory in the Docker container
WORKDIR /app

# Copy the package.json and package-lock.json (if available) to leverage Docker caching
COPY packages/frontend/package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to start the development server
CMD ["npm", "run", "start"]
