# Step 1: Use Node.js base image
FROM node:18-alpine

# Step 2: Set the working directory to /app
WORKDIR /app

# Step 3: Copy the root package.json and package-lock.json
COPY ./package*.json ./

# Step 4: Install all dependencies from the root (includes backend and frontend)
RUN npm install

# Step 5: Copy the frontend folder content into the container
COPY . .

# Step 6: Set the working directory to the frontend folder
WORKDIR /app/src

# Step 7: Build the app for production
RUN npm run build

# Step 8: Expose the frontend port (default React port is 3000)
EXPOSE 3000

# Step 9: Start the app (serve the static build)
CMD ["npm" , "start"]
