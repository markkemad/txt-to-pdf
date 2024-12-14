# Stage 1: Build Stage
FROM node:16 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application code to the build directory
COPY . .

# Stage 2: Production Stage (Minimal Image)
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app /app

# Expose the application port (8080)
EXPOSE 3001

# Run the application
CMD ["node", "app.js"]
