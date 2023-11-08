# Use the lightweight version of Node.js on Alpine Linux
FROM node:alpine

# Set the working directory inside the container
WORKDIR /frontend

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of your source code to the container
COPY . .

# Copy the start-up script into the container and make sure it's executable
COPY start.sh .
RUN chmod +x start.sh

# Run the start-up script which will build and preview your app
CMD ["./start.sh"]
