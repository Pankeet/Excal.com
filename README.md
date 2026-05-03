
# Excal.draw: Collaborative Drawing and Real-Time Communication Platform

## Overview

Excal.draw is a sophisticated, full-stack web application that provides seamless collaborative drawing capabilities combined with integrated real-time messaging functionality. Inspired by Excal.draw, this platform enables multiple users to collaborate on a shared digital canvas whilst communicating instantaneously via an integrated chat interface. The application is architected as a monorepo utilising modern, industry-standard technologies, ensuring scalability, maintainability, and optimal performance across both client and server environments.

---

## Comprehensive Feature Set

### Drawing and Collaboration
- **Real-Time Collaborative Canvas**: Multiple users can draw, sketch, and annotate simultaneously on a shared digital canvas with instantaneous synchronisation across all connected participants.
- **Multi-User Synchronisation**: Leverages WebSocket technology to ensure seamless, latency-optimised updates across all active drawing sessions.
- **Persistent Session Management**: Drawing sessions are maintained and can be resumed, with comprehensive state preservation throughout user interactions.

### Communication
- **Contextual Messaging**: Chat messages are contextually bound to specific drawing sessions, facilitating focused collaboration and discussion.

### User Interface and Experience
- **Responsive Design Architecture**: Built with Tailwind CSS, the application provides a fluid, adaptive user interface that performs optimally across desktop, tablet, and mobile devices.
- **Intuitive User Interface**: Thoughtfully designed controls and visual feedback mechanisms ensure an accessible and engaging user experience.
- **Modern Aesthetic**: Styled with contemporary design principles, utilising Lucide React icons and GSAP animations for polished visual interactions.

---

## Technical Architecture

### Monorepo Structure

This project employs a monorepo pattern managed through **Turborepo** and **pnpm workspaces**, facilitating efficient code sharing, dependency management, and orchestrated builds across multiple applications and packages.

#### Applications (`/apps`)

1. **excal-fe** – Next.js Frontend Application
   - Modern React 19 interface with Next.js 16.2.1
   - Real-time drawing canvas implementation
   - Responsive design with Tailwind CSS v4
   - Optimised asset loading and code splitting

2. **http-server** – Express.js Backend API
   - RESTful API endpoints for user authentication and session management
   - JWT-based authentication and authorisation
   - PostgreSQL database integration via Prisma ORM
   - Comprehensive input validation using Zod schema validation
   - Security features including bcrypt password hashing and CORS protection
   - Unit and integration testing with Vitest

3. **ws-server** – WebSocket Server
   - Real-time WebSocket communication server
   - Manages live drawing synchronisation amongst connected clients
   - Handles session state management and broadcasting
   - JWT token verification for secure WebSocket connections
   - Prisma integration for persistent session storage

#### Shared Packages (`/packages`)

1. **db-local** – Database Configuration Package
   - Centralised Prisma ORM configuration
   - Database schema definitions and migrations
   - Prisma adapter for PostgreSQL
   - Local development database utilities

2. **eslint-config** – Linting Configuration Package
   - Unified ESLint configuration standards
   - Enforces code quality and consistency across the monorepo

3. **typescript-config** – TypeScript Configuration Package
   - Shared TypeScript compiler options
   - Ensures consistent type-checking behaviour across applications

4. **tailwind** – Tailwind CSS Configuration Package
   - Unified Tailwind CSS configuration
   - Consistent design tokens and theming across frontend applications

5. **ui** – Shared Component Library
   - Reusable React components
   - UI primitives for consistent design implementation

---

## Technology Stack

### Frontend
- **Next.js 16.2.1** – React framework for production-grade applications
- **React 19.2.4** – UI library for component-based development
- **Tailwind CSS 4** – Utility-first CSS framework for responsive design
- **TypeScript 5** – Statically typed JavaScript for improved developer experience
- **Axios 1.13.6** – HTTP client for API communication
- **GSAP 3.14.2** – Animation library for sophisticated visual effects
- **Lucide React 1.8.0** – Icon library
- **React Icons 5.6.0** – Supplementary icon set

### Backend
- **Express.js 5.2.1** – Lightweight HTTP server framework
- **Node.js ≥ 18** – Runtime environment
- **WebSocket (`ws` 8.19.0)** – Real-time bidirectional communication protocol
- **Prisma 7.5.0** – Next-generation ORM for database access
- **PostgreSQL** – Robust, enterprise-grade relational database
- **JWT (`jsonwebtoken` 9.0.3)** – Stateless authentication mechanism
- **Bcrypt 6.0.0** – Cryptographic password hashing
- **Zod 4.3.6** – Runtime schema validation library
- **CORS 2.8.6** – Cross-Origin Resource Sharing middleware

### Development and Build Tools
- **Turborepo 2.8.20** – High-performance monorepo build system
- **TypeScript 5.9.2** – Type system and transpilation
- **ESLint 9** – Static code analysis and linting
- **Prettier 3.8.1** – Opinionated code formatter
- **Vitest 4.1.4** – Fast unit testing framework
- **pnpm 9.0.0** – Efficient package manager with dependency resolution optimisation
- **SonarQube** – Code quality and security analysis

---

## Getting Started

### Prerequisites

Ensure the following are installed on your development machine:

- **Node.js** version 18 or later
- **pnpm** version 9.0.0 or later
- **PostgreSQL** database server (version 13 or later for local development)
- **Git** for version control

### Installation and Setup

#### Step 1: Clone the Repository

```bash
git clone https://github.com/Pankeet/Excal.draw.git
cd Excal.draw
```

#### Step 2: Install Dependencies

Using pnpm (required for this project):

```bash
pnpm install
```

This command will install all dependencies across all applications and packages within the monorepo.

#### Step 3: Environment Configuration

Create environment configuration files for each application:

##### HTTP Server Environment (`apps/http-server/.env`)

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/excal_db"

# JWT Configuration
JWT_SECRET="your-secret-key-here-change-in-production"
JWT_EXPIRY="7d"

# Server Configuration
PORT=3001
NODE_ENV="development"

# CORS
ALLOWED_ORIGINS="http://localhost:3000,http://localhost:3002"
```

##### WebSocket Server Environment (`apps/ws-server/.env`)

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/excal_db"

# JWT Configuration
JWT_SECRET="your-secret-key-here-change-in-production"

# Server Configuration
PORT=3002
NODE_ENV="development"
```

#### Step 4: PostgreSQL Database Setup

##### Using Docker 

```bash
docker run --name excal-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=excal_db \
  -p 5432:5432 \
  -d postgres:16-alpine
```

#### Step 5: Run Database Migrations

Execute Prisma migrations to establish the database schema:

```bash
prisma migrate dev
```

and generate Prisma client:

```bash
pnpm --filter @repo/db-local run config
```

#### Step 6: Start Development Servers

The project is configured to run all servers concurrently. Execute ( in root ):

```bash
pnpm run dev
```

This command will initiate:
- **Database Configuration Service** – Manages Prisma schemas (port: internal)
- **HTTP API Server** – Express.js REST API (port: 3001)
- **WebSocket Server** – Real-time communication server (port: 3002)
- **Frontend Development Server** – Next.js application (port: 3000)

Monitor the console output for server readiness confirmations.

#### Step 7: Verify Installation

Navigate to your browser and verify each service:

- **Frontend Application**: [http://localhost:3000](http://localhost:3000)

---

## Development Workflow

### Building the Project

Compile all applications and packages:

```bash
pnpm run build
```

This orchestrates builds in dependency order using Turborepo's intelligent caching mechanisms.

### Code Quality Assurance

#### Linting

Analyse code for style violations and potential issues:

```bash
pnpm run lint
```

#### Type Checking

Validate TypeScript types across the monorepo:

```bash
pnpm run check-types
```

#### Code Formatting

Apply consistent code formatting using Prettier:

```bash
pnpm run format
```

#### Running Tests

Execute unit and integration tests:

```bash
pnpm run test
```

Run tests for a specific application ( currently http-server only):

```bash
pnpm --filter http-server run test
```

Generate coverage reports:

```bash
pnpm --filter http-server run test:coverage
```

---

## Language Composition

- **TypeScript**: 92.9% – Primary language for type-safe development across frontend and backend
- **JavaScript**: 5.9% – Configuration files and legacy components
- **CSS**: 1.2% – Styling and design specifications

---

## API Documentation

### Authentication Endpoints

#### User Registration
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "User Name"
}

Response (201)
```

#### User Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response (200):
{
  "token": "jwt-token",
  "message": "Signin Successful
}
```

### Drawing Session Endpoints

#### Create Session
```http
POST /api/v1/create-room
Authorization: token
Content-Type: application/json

{
  "name": "Room Name",
}

Response (201):
{
  "id": "room-id",
}
```

#### Get Session Details
```http
GET /api/v1/chats/:roomId
Authorization: token

Response (200):
{
  "messages": [...]
}
```

---

## Testing Strategy

### Unit and Integration Testing

The HTTP server utilises **Vitest** for comprehensive test coverage:

```bash
# Run all tests
pnpm --filter http-server run test

# Run tests in watch mode
pnpm --filter http-server run test:watch

# Generate coverage report
pnpm --filter http-server run test:coverage
```

### Test File Locations

- **HTTP Server Tests**: `apps/http-server/src/**/*.test.ts`


## Code Quality Assurance

### SonarQube Integration

This project is integrated with **SonarQube** for continuous code quality monitoring:

- Static code analysis and pattern detection
- Security vulnerability identification
- Test coverage tracking and metrics
- Code duplication analysis
- Maintainability index calculations

Configuration is defined in `sonar-project.properties`.


## Building for Production

### Compile Production Build

Create an optimised production build:

```bash
pnpm run build
```

This command:
- Transpiles TypeScript to JavaScript
- Optimises bundle sizes
- Generates source maps for debugging
- Verifies type safety across the monorepo

### Generate Artifacts

Production-ready files are generated in:
- **Frontend**: `apps/excal-fe/.next/`
- **HTTP Server**: `apps/http-server/dist/`
- **WebSocket Server**: `apps/ws-server/dist/`

### Start Production Servers

#### HTTP API Server
```bash
cd apps/http-server
pnpm start
```

#### WebSocket Server
```bash
cd apps/ws-server
pnpm start
```

#### Frontend Application
```bash
cd apps/excal-fe
pnpm start
```

---

## Deployment Guide

#### Docker Deployment

Create a `Dockerfile` for containerised deployment:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY pnpm-lock.yaml ./
COPY package.json ./
COPY pnpm-workspace.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

EXPOSE 3000 3001 3002

CMD ["pnpm", "run", "dev"]
```

Build and run:
```bash
docker build -t excal-com .
docker run -p 3000:3000 -p 3001:3001 -p 3002:3002 excal-com
```

---

## Troubleshooting

### Common Issues and Solutions

#### Database Connection Errors

**Issue**: `ERROR: connect ECONNREFUSED 127.0.0.1:5432`

**Solution**:
1. Verify PostgreSQL is running: `pg_isready -h localhost`
2. Check database credentials in `.env`
3. Ensure database exists: `psql -U postgres -l`
4. Restart PostgreSQL service

#### Port Already in Use

**Issue**: `Error: listen EADDRINUSE: address already in use :::3001`

**Solution**:

# change port in .env files
```

#### pnpm Installation Issues

**Issue**: `pnpm: command not found`

**Solution**:
```bash
npm install -g pnpm@9.0.0
pnpm --version
```

#### Module Resolution Errors

**Issue**: `Cannot find module '@repo/db-local'`

**Solution**:
1. Verify `pnpm-workspace.yaml` is correctly configured
2. Run `pnpm install` from root directory
3. Check `package.json` workspace dependencies
4. Clear `node_modules`: `pnpm rm -r node_modules && pnpm install`

#### TypeScript Compilation Errors

**Issue**: Type errors despite correct types

**Solution**:
```bash
pnpm run check-types
pnpm run build --force
```

#### WebSocket Connection Failures

**Issue**: `WebSocket connection to 'ws://localhost:3002' failed`

**Solution**:
1. Verify WebSocket server is running on correct port
2. Check firewall rules allow WebSocket connections
3. Verify `NEXT_PUBLIC_WS_URL` matches server address
4. Check JWT token is valid in WebSocket handshake

---

## Performance Optimisation

### Frontend Optimisation

- **Code Splitting**: Next.js automatically splits code by route
- **Image Optimisation**: Utilise Next.js Image component for automatic optimisation
- **Caching**: Implement aggressive caching strategies for static assets
- **Lazy Loading**: Use dynamic imports for components not immediately needed

### Backend Optimisation

- **Database Indexing**: Add indexes to frequently queried columns
- **Query Optimisation**: Analyse slow queries using Prisma Metrics
- **Connection Pooling**: Configure Prisma connection pool settings
- **Caching Strategy**: Implement Redis caching for frequently accessed data

### Monitoring and Debugging

- **Console Logging**: Structured logging for development
- **Error Tracking**: Implement Sentry or similar error monitoring
- **Performance Monitoring**: Use performance profiling tools
- **Network Analysis**: Monitor WebSocket and HTTP request patterns

---

## Contributing Guidelines

Contributions to Excal.draw are welcomed and encouraged.


### Code Style Guidelines

- Follow TypeScript best practices
- Use meaningful variable and function names
- Add JSDoc comments for public functions
- Maintain consistent formatting with Prettier
- Write comprehensive commit messages

---

## License

This project is distributed under the **MIT License**. See the [LICENSE](LICENSE) file for complete terms and conditions.

---

## Contact and Support

**Project Maintainer**: [@Pankeet](https://github.com/Pankeet)

For inquiries, feedback, or support:
- Email: [Contact via GitHub](https://github.com/Pankeet)
- GitHub: [Project Repository](https://github.com/Pankeet/Excal.draw)
- LinkedIn: [Profile](https://www.linkedin.com/in/pankeet04/)