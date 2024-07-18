# Use the official Node.js image with Node.js 18.
FROM node:18-slim

# Update npm to the latest version
RUN npm install -g npm@latest

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install dependencies.
COPY package*.json ./
RUN npm install --legacy-peer-deps || npm install --force

# Copy the local code to the container image.
COPY . .

# Build the app.
RUN npm run build

# Run the web service on container startup.
CMD [ "npm", "start" ]
