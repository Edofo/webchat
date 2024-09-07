# WebChat Monorepo

## Description

This repository is a **monorepo** that contains both the frontend and backend of the **WebChat** application. The application is built with a React frontend and a NestJS backend, connected via GraphQL. It provides real-time messaging, friend management, and WebSocket-based communication.

## Monorepo Structure

The repository is organized as follows:

```
webchat/
│
├── webchat-back/   # Backend (NestJS + GraphQL + PostgreSQL)
│   ├── src/        # Backend source code
│   └── ...
│
└── webchat-front/  # Frontend (React + GraphQL)
    ├── src/        # Frontend source code
    └── ...
```

## Prerequisites

Before running the project, ensure you have the following tools installed:

- **Node.js** (version 22.x or higher)
- **pnpm** (for package management)
- **Docker** and **Docker Compose** (to run the entire project with containers)

## Setup

### 1. Clone the Repository

Start by cloning the monorepo:

```bash
git clone https://github.com/Edofo/webchat.git
cd webchat
```

### 2. Configure Environment Variables

Both the frontend and backend require environment variables. To set them up:

#### Backend:

1. Navigate to `webchat-back/` and create a `.env` file from the example file:

```bash
cd webchat-back
cp .env.example .env
```

2. Edit the `.env` file with your database and environment configurations.

#### Frontend:

1. Navigate to `webchat-front/` and create a `.env` file from the example file:

```bash
cd ../webchat-front
cp .env.example .env
```

2. Make sure the following environment variables are set in the `.env` file to point to the backend's GraphQL server:

```bash
VITE_API_URL=http://localhost:4000/graphql
```

### 3. Docker Setup

A `docker-compose.yml` file is provided at the root of the monorepo to easily start both the frontend and backend services, along with a PostgreSQL database.

To run the entire application, simply use Docker Compose.

### 4. Run the Application with Docker Compose

To start the frontend, backend, and database services all at once, run the following command from the root of the project:

```bash
docker-compose up --build
```

This will:

- Build and start the **backend** service (NestJS + GraphQL + PostgreSQL).
- Build and start the **frontend** service (React + GraphQL).
- Spin up a **PostgreSQL** database container.

Once the services are running, the following URLs will be available:

- **Frontend**: `http://localhost:3000`
- **Backend GraphQL API**: `http://localhost:4000/graphql`

To stop all services, use:

```bash
docker-compose down
```

### 5. Run the Application Locally (Without Docker)

If you prefer to run the application without Docker, follow these steps:

#### Backend:

1. Install dependencies and set up the PostgreSQL database:
   
```bash
cd webchat-back
pnpm install
pnpm prisma migrate dev
```

2. Run the backend in development mode:

```bash
pnpm start:dev
```

#### Frontend:

1. Install dependencies and start the React development server:

```bash
cd ../webchat-front
pnpm install
pnpm dev
```

### Database

The backend uses **PostgreSQL** as its database. When running via Docker Compose, a PostgreSQL container will be started automatically.

If you're not using Docker, you will need to set up a PostgreSQL instance locally, and ensure the correct database configurations are set in the `webchat-back/.env` file.
