# Frontend Dockerfile
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Expose the port for Vite
EXPOSE 5173