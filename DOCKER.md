# Docker Setup for Arctic Region

This document explains how to run the Arctic Region application using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose installed

## Quick Start

### Production Build

```bash
# Build and run the production container
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

### Development Build

```bash
# Run development version with hot reloading
docker-compose --profile dev up --build

# Or run in detached mode
docker-compose --profile dev up -d --build
```

## Individual Docker Commands

### Production

```bash
# Build the production image
docker build -t arctic-region .

# Run the production container
docker run -p 3000:3000 arctic-region

# Run in detached mode
docker run -d -p 3000:3000 --name arctic-app arctic-region
```

### Development

```bash
# Build the development image
docker build -f Dockerfile.dev -t arctic-region-dev .

# Run the development container
docker run -p 3001:3000 -v $(pwd):/app arctic-region-dev

# Run in detached mode
docker run -d -p 3001:3000 -v $(pwd):/app --name arctic-dev arctic-region-dev
```

## Container Management

```bash
# View running containers
docker ps

# View logs
docker logs arctic-region-app

# Stop containers
docker-compose down

# Remove containers and images
docker-compose down --rmi all

# Clean up Docker system
docker system prune -a
```

## Environment Variables

You can set environment variables in the `docker-compose.yml` file:

```yaml
environment:
  - NODE_ENV=production
  - NEXT_TELEMETRY_DISABLED=1
  - CUSTOM_VAR=value
```

## Ports

- **Production**: http://localhost:3000
- **Development**: http://localhost:3001

## Volumes

The development setup includes volume mounts for hot reloading:
- Source code is mounted to `/app`
- Node modules are preserved in container

## Networks

All containers use the `arctic-network` bridge network for communication.

## Troubleshooting

### Build Issues
```bash
# Clean build
docker-compose down --rmi all
docker system prune -a
docker-compose up --build
```

### Port Conflicts
```bash
# Check what's using port 3000
lsof -i :3000

# Use different ports in docker-compose.yml
ports:
  - "3002:3000"
```

### Permission Issues
```bash
# Fix file permissions
sudo chown -R $USER:$USER .
```

## Production Deployment

For production deployment, use the production Dockerfile:

```bash
# Build optimized production image
docker build -t arctic-region-prod .

# Run with environment variables
docker run -d \
  -p 3000:3000 \
  -e NODE_ENV=production \
  --name arctic-prod \
  arctic-region-prod
```

## Health Check

The application includes basic health checks. You can test with:

```bash
# Check if container is running
docker ps

# Check application health
curl http://localhost:3000
```

## Logs

```bash
# View real-time logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f arctic-app
``` 