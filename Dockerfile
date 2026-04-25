# Use official Node LTS
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install app dependencies first (better caching)
COPY package*.json ./
RUN npm install --omit=dev

# Bundle app source
COPY . .

# Expose port (adjust if needed)
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
