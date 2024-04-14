# Use the official Node.js image as a base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .


# Expose the port on which your frontend app will run
EXPOSE 3001

# Command to run the production server
CMD ["npm", "run", "dev"]