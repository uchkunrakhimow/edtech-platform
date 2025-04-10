# Build stage for the client
FROM node:22-alpine AS client-build

WORKDIR /app/client

# Copy client package files and install dependencies
COPY client/package*.json ./
RUN npm ci

# Copy client source code
COPY client/ ./

# Build the client application
RUN npm run build

# Build stage for the server
FROM node:22-alpine AS server-build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the server source code
COPY . .

# Generate Prisma client
RUN npm run prisma:generate

# Build the server application
RUN npm run build

# Copy client build from client-build stage
COPY --from=client-build /app/client/dist ./client/dist

# Production stage
FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy prisma schema and migrations for database setup
COPY prisma ./prisma/

# Copy built server files
COPY --from=server-build /app/dist ./dist

# Copy built client files
COPY --from=server-build /app/client/dist ./client/dist

# Copy documentations for Swagger
COPY docs ./docs/

# Generate Prisma client in production
RUN npx prisma generate

# Expose the API port
EXPOSE 3000

# Set NODE_ENV to production
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]