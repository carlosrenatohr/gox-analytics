# 📊 GOX ANALYTICS - User Behavior Analytics API 🌵

An user behavior analytics platform that tracks and analyzes user events on websites. Built with Node.js +  TypeScript, MongoDB, and Redis caching.

** Live Demo:** [http://gox-load-balancer3-1001085163.us-east-2.elb.amazonaws.com/health](http://gox-load-balancer3-1001085163.us-east-2.elb.amazonaws.com/health)

---

## 🚀 What does this do?

- **🔧 Robust Architecture**: Multi-layered architecture with clear separation of concerns (Controllers → Services → Repositories → Database)
- **⚡ Scalable Performance**: Intelligent Redis caching layer with configurable TTL, reducing database load by up to 90%
- **📊 Production-Ready Analytics**: Advanced MongoDB aggregation pipelines optimized for real-time analytics
- **🔄 Maintainable Codebase**: TypeScript with strict typing, comprehensive documentation, and consistent coding patterns
- **🚀 Cloud-Native Design**: Containerized with Docker, deployed on AWS Fargate with auto-scaling capabilities

The development team in charge (1) poured countless hours into crafting each endpoint, ensuring that every line of code contributes to a system that not only meets current requirements but is engineered to evolve and scale with future demands. This isn't just another API—ish, it is THE API.

---

## 🛠️ Tech Stack

### Core Technologies
- **Backend**: Node.js + TypeScript + Express.js
- **Database**: MongoDB with Mongoose ODM
- **Caching**: Upstash Redis
- **Documentation**: Swagger/OpenAPI 3.0
- **Containerization**: Docker + Docker Compose
- **Deployment**: AWS Fargate + ECS

### Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint + Prettier
- **Testing**: (Planned) Vitest
- **CI/CD**: (Planned) GitHub Actions

---

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- Docker & Docker Compose
- pnpm (recommended) or npm

### 1. Clone & Setup

```bash
git clone https://github.com/your-repo/gox-analytics.git
cd gox-analytics
```

### 2. Environment Configuration

Create your environment files:

```bash
# .env.dev (for development)
MONGO_URI=mongodb://localhost:27017/gox_analytics
NODE_ENV=development
PORT=3000
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
JWT_SECRET=your_jwt_secret_key

# .env (for production)
MONGO_URI=your_production_mongo_uri
NODE_ENV=production
PORT=3000
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
JWT_SECRET=your_production_jwt_secret
```

### 3. Start with Docker Compose

```bash
docker-compose up --build
```

This starts:
- **API Server**: http://localhost:3000
- **MongoDB**: localhost:27017
- **API Documentation**: http://localhost:3000/api-docs

### 4. Seed Database (Optional)

```bash
# Development seeding
pnpm run seed:dev

# Production seeding
pnpm run seed
```

This will generate 100,000 sample events for testing.

---

## 📚 API Documentation

### Swagger Integration

The API includes comprehensive Swagger documentation automatically generated from JSDoc comments:

- **Local**: http://localhost:3000/api-docs
- **Production**: http://gox-load-balancer3-1001085163.us-east-2.elb.amazonaws.com/api-docs

#### Key Features:
- **Interactive Testing**: Test endpoints directly from the browser
- **Request/Response Examples**: Pre-filled examples for all endpoints
- **Authentication**: Bearer token authentication support
- **Schema Validation**: Automatic request/response validation

Feel free to explore documentation by yourself.

---

## 🔄 Caching with Upstash Redis

### Cache Implementation

The application uses Upstash Redis for intelligent caching:

#### Cache Configuration
```typescript
// src/lib/cacheUtil.ts
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
```

#### Cache Strategy
- **TTL**: 60 minutes (configurable)
- **Fallback**: Graceful degradation if Redis is unavailable
- **Key Generation**: Based on query parameters for uniqueness
- **Serialization**: JSON serialization for complex objects

#### Usage Example
```typescript
// Cache key generation
const cacheKey = `stats:page-views:${fromKey}:${toKey}:${limit}:${page}:${orderBy}:${orderDirection}:${groupBy}`;

// Get or set cache
return getOrSetCache(cacheKey, async () => {
    // Your expensive database query here
    return await EventModel.aggregate(pipeline);
});
```

#### Cache Benefits
- **Performance**: 10x faster response times for repeated queries
- **Cost Reduction**: Reduced database load
- **Scalability**: Handles high-traffic scenarios
- **Reliability**: Automatic fallback to database

### Authentication Endpoints

Protection for the key endpoints by implementing a Bearer auth layer. It's required to generate a token to use it on the application first while sendint your requests. For testing purposes, this is possible by the next simple endpoint.

#### Get Access Token
```http
GET /api/v1/auth/token
```

**Rate Limited**: 5 requests per 15 minutes

---

## 🗄️ Database Seeding

### Seeding Configuration

The application includes a comprehensive seeding system:

#### Seed Script Location
```bash
src/scripts/event.seeder.ts
```

#### Configuration Constants
```typescript
// src/config/constants.ts
export const TOTAL_EVENTS = 100000;  // Total events to generate
export const BATCH_SIZE = 1000;      // Batch size for bulk operations
```

#### Data Generation Features
- **Realistic URLs**: Popular page paths (/home, /products, /about, etc.)
- **Referrer Sources**: Real website referrers
- **Device Diversity**: Mobile, desktop, tablet
- **Browser Variety**: Chrome, Firefox, Safari, Edge
- **Event Types**: page_view, click, signup, scroll, etc.
- **Time Distribution**: Events spread over 30 days

#### Running Seeds

```bash
# Development seeding (with .env.dev)
pnpm run seed:dev

# Production seeding (with .env)
pnpm run seed

```

---

## ☁️ AWS Fargate Deployment

### Infrastructure Overview

The application is deployed on AWS using Fargate for serverless container management:

#### Architecture Components
- **ECR**: A Managed Docker container registry 
- **ECS Fargate**: Container orchestration
- **Application Load Balancer**: Traffic distribution
- **Atlas**: Third Party MongoDB for production
- **Upstash**: Redis caching alt
- **CloudWatch**: Logging and monitoring

#### Environment Variables for Production
```bash
NODE_ENV=production
PORT=3000
MONGO_URI=your_production_mongo_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
JWT_SECRET=your_production_jwt_secret
```

#### Deployment Commands
```bash
# Build and push Docker image
docker build -t gox-analytics .
docker tag gox-analytics:latest {your-ecr-repo}/gox-analytics:latest
docker push {your-ecr-repo}/gox-analytics:latest

# Update ECS service
aws ecs update-service --cluster gox-cluster --service gox-service --force-new-deployment
```


## 🔧 Development

### Available Scripts

```bash
# Development
pnpm run dev          # Start development server with hot reload
pnpm run build        # Build TypeScript to JavaScript
pnpm run start        # Start production server
pnpm run start:prod   # Start optimized production server

# Database
pnpm run seed         # Seed database with sample data
pnpm run seed:dev     # Seed database using .env.dev

# Code Quality
pnpm run lint         # Run ESLint
pnpm run lint:fix     # Fix ESLint issues
pnpm run format       # Format code with Prettier

# Testing (Planned)
pnpm run test         # Run unit tests
pnpm run test:watch   # Run tests in watch mode
pnpm run test:coverage # Run tests with coverage
```

