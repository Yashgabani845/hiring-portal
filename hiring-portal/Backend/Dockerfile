# Step 1: Use Node.js base image
FROM node:18-alpine

# Step 2: Set the working directory to /app
WORKDIR /app

# Step 3: Copy the root package.json and package-lock.json
COPY ./package*.json ./

# Step 4: Install all dependencies from the root (includes backend and frontend)
RUN npm install

# Step 5: Copy the backend folder content into the container
COPY . .

# Step 6: Set the working directory to the backend folder
WORKDIR /app/backend

# Step 7: Expose the backend port (same as your Express app, e.g., 5000)
EXPOSE 5000

# Step 8: Start the server
CMD ["node", "server.js"]
