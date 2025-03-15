FROM node:20-alpine AS builder
LABEL authors="udhay707"

# Set working directory
WORKDIR /app

# Install dependencies first to leverage Docker cache
COPY package.json package-lock.json ./
RUN npm install --production=false

# Copy the rest of the application source code
COPY . .

# Build the Next.js application
RUN npm run build

# Remove development dependencies for smaller production image
RUN npm prune --production

# Production stage
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Copy necessary files from builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose port 3000 (Next.js default)
EXPOSE 4330

# Start the Next.js server
CMD ["npm", "start"]
