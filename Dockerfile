# Use an official node.js runtime as a parent image
FROM node:22-alpine

# Set the working directory in the container 
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json .

# Install the dependencies
RUN npm install

# Copt the rest of the application code
COPY . .

# Expose the port that the app runs on
EXPOSE 5103

# Define the command to run application
CMD ["node", "./src/server.js"]