# Microservices with Docker

A comprehensive microservices architecture project demonstrating how to deploy multiple microservices using Docker containers with Nginx as a reverse proxy to create a unified API gateway.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Docker Commands](#docker-commands)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This project demonstrates a microservices architecture where multiple independent services are containerized using Docker and exposed through a single entry point using Nginx as a reverse proxy. This approach provides several benefits:

- **Service Isolation**: Each microservice runs in its own container
- **Scalability**: Individual services can be scaled independently
- **Unified Gateway**: All services accessible through a single endpoint
- **Load Balancing**: Nginx distributes traffic across service instances
- **Security**: Internal services are not directly exposed to external networks

## 🏗️ Architecture

```
                                    ┌─────────────────┐
                                    │   Nginx Proxy   │
                                    │   (Port 80)     │
                                    └────────┬────────┘
                                             │
                    ┌────────────────────────┼────────────────────────┐
                    │                        │                        │
            ┌───────▼────────┐      ┌───────▼────────┐      ┌───────▼────────┐
            │  Service 1     │      │  Service 2     │      │  Service 3     │
            │  (Container)   │      │  (Container)   │      │  (Container)   │
            └────────────────┘      └────────────────┘      └────────────────┘
```

The architecture consists of:

1. **Nginx Reverse Proxy**: Acts as an API gateway, routing requests to appropriate microservices
2. **Microservices**: Independent services running in separate Docker containers
3. **Docker Network**: Allows containers to communicate with each other
4. **Docker Compose**: Orchestrates multi-container deployment

## ✨ Features

- 🐳 **Dockerized Microservices**: All services containerized for consistency
- 🔄 **Reverse Proxy**: Nginx for request routing and load balancing
- 🔐 **Service Isolation**: Each service runs independently
- 📦 **Easy Deployment**: One-command deployment with Docker Compose
- 🔧 **Configurable**: Easy to add new services or modify existing ones
- 📊 **Scalable**: Services can be scaled horizontally

## 📦 Prerequisites

Before running this project, ensure you have the following installed:

- **Docker**: Version 20.10 or higher
  ```bash
  docker --version
  ```

- **Docker Compose**: Version 1.29 or higher
  ```bash
  docker-compose --version
  ```

### Installation Links

- [Install Docker](https://docs.docker.com/get-docker/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/IsthatAyus/microservices-docker.git
cd microservices-docker
```

### Build and Run Services

```bash
# Build all services
docker-compose build

# Start all services
docker-compose up -d

# View running containers
docker-compose ps

# View logs
docker-compose logs -f
```

### Stop Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## 📁 Project Structure

```
microservices-docker/
├── nginx/
│   ├── nginx.conf          # Nginx configuration file
│   └── Dockerfile          # Nginx container configuration
├── service1/
│   ├── Dockerfile          # Service 1 container configuration
│   ├── app/                # Application code
│   └── requirements.txt    # Dependencies (if applicable)
├── service2/
│   ├── Dockerfile          # Service 2 container configuration
│   ├── app/                # Application code
│   └── requirements.txt    # Dependencies (if applicable)
├── service3/
│   ├── Dockerfile          # Service 3 container configuration
│   ├── app/                # Application code
│   └── requirements.txt    # Dependencies (if applicable)
├── docker-compose.yml      # Docker Compose orchestration file
└── README.md              # This file
```

## ⚙️ Configuration

### Docker Compose Configuration

The `docker-compose.yml` file defines all services and their configurations:

```yaml
version: '3.8'

services:
  nginx:
    build: ./nginx
    ports:
      - "80:80"
    depends_on:
      - service1
      - service2
      - service3
    networks:
      - microservices-network

  service1:
    build: ./service1
    networks:
      - microservices-network

  service2:
    build: ./service2
    networks:
      - microservices-network

  service3:
    build: ./service3
    networks:
      - microservices-network

networks:
  microservices-network:
    driver: bridge
```

### Nginx Configuration

The `nginx/nginx.conf` file routes requests to appropriate services:

```nginx
upstream service1 {
    server service1:8001;
}

upstream service2 {
    server service2:8002;
}

upstream service3 {
    server service3:8003;
}

server {
    listen 80;
    
    location /service1/ {
        proxy_pass http://service1/;
    }
    
    location /service2/ {
        proxy_pass http://service2/;
    }
    
    location /service3/ {
        proxy_pass http://service3/;
    }
}
```

## 💻 Usage

### Accessing Services

Once the services are running, access them through the Nginx gateway:

```bash
# Access Service 1
curl http://localhost/service1/

# Access Service 2
curl http://localhost/service2/

# Access Service 3
curl http://localhost/service3/
```

### Adding a New Service

1. Create a new directory for your service
2. Add a Dockerfile for the service
3. Update `docker-compose.yml` to include the new service
4. Update `nginx/nginx.conf` to add routing for the new service
5. Rebuild and restart:
   ```bash
   docker-compose up -d --build
   ```

## 🔌 API Endpoints

Example endpoints for each service:

### Service 1
- `GET /service1/` - Service 1 home
- `GET /service1/health` - Health check

### Service 2
- `GET /service2/` - Service 2 home
- `GET /service2/health` - Health check

### Service 3
- `GET /service3/` - Service 3 home
- `GET /service3/health` - Health check

## 🐳 Docker Commands

### Useful Docker Commands

```bash
# View running containers
docker ps

# View all containers (including stopped)
docker ps -a

# View container logs
docker logs <container_name>

# Execute command in container
docker exec -it <container_name> /bin/bash

# View images
docker images

# Remove unused images
docker image prune

# View networks
docker network ls

# Inspect network (replace with your actual network name from 'docker network ls')
docker network inspect <network_name>
# Example: docker network inspect microservices-docker_microservices-network
```

### Docker Compose Commands

```bash
# Start services in detached mode
docker-compose up -d

# Stop services
docker-compose down

# Rebuild services
docker-compose build

# View logs
docker-compose logs

# Scale a service
docker-compose up -d --scale service1=3

# Restart a specific service
docker-compose restart service1
```

## 🔧 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Check what's using port 80
sudo lsof -i :80

# Change the port in docker-compose.yml
ports:
  - "8080:80"  # Use port 8080 instead
```

**Container won't start**
```bash
# Check container logs
docker-compose logs service1

# Check container status
docker-compose ps
```

**Cannot connect to services**
```bash
# Verify network connectivity (use your network name from 'docker network ls')
docker network inspect <network_name>

# Restart all services
docker-compose restart
```

**Build fails**
```bash
# Clean build
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write clear commit messages
- Update documentation as needed
- Test your changes thoroughly
- Ensure all services build and run correctly

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Ayush Shrestha**

- GitHub: [@IsthatAyus](https://github.com/IsthatAyus)

## 🙏 Acknowledgments

- Docker for containerization technology
- Nginx for reverse proxy capabilities
- The open-source community for inspiration and resources

---

**Note**: This is a template/demonstration project. Customize it according to your specific microservices and requirements.
