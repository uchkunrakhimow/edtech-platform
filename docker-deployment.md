# Docker Deployment Guide

This document provides instructions for deploying the EdTech platform using Docker.

## Prerequisites

- Docker and Docker Compose installed on your system
- Git to clone the repository

## Deployment Steps

### 1. Clone the repository

```bash
git clone https://github.com/uchkunrakhimow/edtech-platform.git
cd edtech-platform
```

### 2. Configure environment variables

You can either:

- Let Docker Compose use the default values from the docker-compose.yml file
- Create a `.env` file in the project root with custom values:

```
JWT_SECRET=your-custom-secret
```

### 3. Build and start the containers

```bash
docker-compose up -d
```

This command will:

- Build the Docker image for the application
- Pull the PostgreSQL image
- Create and start the containers
- Run the database migrations

### 4. Access the application

The application will be available at:

```
http://localhost:3000
```

The API documentation (Swagger) can be accessed at:

```
http://localhost:3000/api-docs
```

## Database Management

### Accessing the database

You can connect to the PostgreSQL database using:

```bash
docker exec -it edtech-db psql -U postgres -d edtechapp
```

### Running database migrations

Migrations are automatically applied when the container starts. To manually run migrations:

```bash
docker exec -it edtech-api npm run prisma:migration:prod
```

### Seeding the database

To seed the database with initial data:

```bash
docker exec -it edtech-api npm run prisma:seed
```

## Troubleshooting

### Viewing logs

To view the logs for the API container:

```bash
docker logs edtech-api
```

### Restarting services

If you need to restart the services:

```bash
docker-compose restart
```

### Rebuilding the application

If you make changes to the application, rebuild the containers:

```bash
docker-compose up -d --build
```

## Production Considerations

For production deployments, consider:

1. Using a reverse proxy (like Nginx) for SSL termination
2. Setting up proper backups for the PostgreSQL volume
3. Implementing container health checks
4. Using Docker secrets for sensitive information
5. Setting up container monitoring
