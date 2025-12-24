# Stage 1: Build
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --ignore-engines --frozen-lockfile

# Copy the TypeScript source code
COPY tsconfig.json ./
COPY src ./src
ARG ENABLE_ALPINE_PRIVATE_NETWORKING
ENV ENABLE_ALPINE_PRIVATE_NETWORKING=true

# Build the TypeScript code
RUN yarn build

# Stage 2: Production Image
FROM node:20-alpine AS production

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock file
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --ignore-engines --production --frozen-lockfile && yarn cache clean

# Copy the built code from the builder stage
COPY --from=builder /app/build ./src

# Copy the .env file
COPY .env.example .env

# Set environment variables (optional, for production)
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 4000

# Command to run the app
CMD ["node", "src/index.js"]
 