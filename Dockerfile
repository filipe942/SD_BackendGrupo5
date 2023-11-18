# Use the lightweight version of Node.js on Alpine Linux
FROM node:alpine

# Set the initial working directory inside the container
WORKDIR /app

# Copy the client and server folders
COPY ./client ./client
COPY ./server ./server

# Install npm dependencies for the server
WORKDIR /app/server
RUN npm install

# Install npm dependencies for the client
WORKDIR /app/client
RUN npm install

# Set the working directory to the client
WORKDIR /app/client
RUN npm run build

# Run development
CMD ["npm", "run", "start"]