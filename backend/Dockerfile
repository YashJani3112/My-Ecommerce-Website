# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./


RUN npm install

# Copy the rest of the backend files
COPY . .

# Expose the backend port
EXPOSE 3000

# Start the backend
CMD ["node", "server.js"]
