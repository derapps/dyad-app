# Use Node.js 18 on Alpine Linux (smaller, faster, more secure)
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Add metadata
LABEL maintainer="Your Name"
LABEL description="Dyad application for zero2launch.co.uk"
LABEL version="1.0.0"

# Copy package files first (better Docker layer caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S dyad -u 1001 -G nodejs

# Copy application code
COPY . .

# Change ownership to non-root user
RUN chown -R dyad:nodejs /app
USER dyad

# Expose port 3000
EXPOSE 3000

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["npm", "start"]
