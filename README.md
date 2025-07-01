# Cyndicate Club Documentation

> Complete integration guide for Cyndicate Club real estate property data synchronization.

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm start

# Build for production
pnpm build
```

### Docker

#### Production Build
```bash
# Build and run production container
docker-compose up --build

# Access documentation at http://localhost:3000
```

#### Development with Hot Reload
```bash
# Run development container with hot reload
docker-compose --profile dev up docs-dev

# Access development server at http://localhost:3001
```

#### Manual Docker Commands
```bash
# Build image
docker build -t cyndicate-docs .

# Run container
docker run -p 3000:80 cyndicate-docs
```

## 🔧 GitHub Actions

The project includes automated CI/CD pipeline that:

- ✅ **Tests and builds** on every push and PR
- 🚀 **Deploys to GitHub Pages** on main branch
- 🐳 **Builds Docker image** and pushes to Docker Hub
- 📦 **Caches dependencies** for faster builds

### Setup Requirements

1. **GitHub Pages**: Enable Pages in repository settings
2. **Docker Hub**: Add secrets to repository:
   - `DOCKER_USERNAME`: Your Docker Hub username
   - `DOCKER_PASSWORD`: Your Docker Hub access token

### Deployment

The documentation automatically deploys to:
- **GitHub Pages**: `https://docs.cyndicate.club`
- **Docker Hub**: `cyndicateclub/docs:latest`

## 📚 Documentation Structure

- **Integration**: Complete API integration guide
- **Authentication**: HTTP Basic auth setup
- **Data Schema**: Property data format and validation
- **API Endpoints**: Complete API reference
- **Scheduling**: Feed scheduling and update strategies

## 🛠 Built With

- [Docusaurus](https://docusaurus.io/) - Documentation framework
- [React](https://reactjs.org/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Docker](https://www.docker.com/) - Containerization
- [GitHub Actions](https://github.com/features/actions) - CI/CD

## 📄 License

Copyright © 2025 Cyndicate Club. All rights reserved.
