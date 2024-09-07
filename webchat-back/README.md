# Webchat Backend

## Description

This project is an application based on NestJS, a progressive Node.js framework for building efficient and scalable server-side applications.

## Prerequisites

Ensure the following tools are installed on your machine:

- **Node.js** (version 22.x or higher)
- **pnpm** (instead of npm or yarn)
- **Docker** and **Docker Compose** (for running the application via containers)

## Setup:

Clone the project repository:

```bash
git clone https://github.com/Edofo/webchat
```

Navigate to the project directory:

```bash
cd webchat-back
```

Install dependencies:

If you are not using Docker Compose, you can install the project dependencies manually using `pnpm`:

```bash
pnpm install
```

## Configuration

Create a .env file at the root of the project and add the necessary environment variables. 
An example is already provided in `.env.example`.

## Database

If you are **not using Docker**, you will need to set up a PostgreSQL database on your machine. Follow these additional steps:

1. Install PostgreSQL if it's not already installed.
2. Ensure that your `.env` file contains the correct information to connect to the PostgreSQL database (host, port, user, password, database name).
3. Once the database is set up, run the following command to apply the Prisma migrations to the database:

```bash
pnpm prisma migrate dev
```

## Running the Application

To start the application in development mode:

```bash
pnpm start:dev
```

To start the application in production mode:

```bash
pnpm build
pnpm start:prod
```

You can also run the frontend with Docker Compose. To do so, ensure Docker and Docker Compose are installed and run the following commands:

```bash
docker compose up -d --build
pnpm prisma migrate dev
```

The Graphql Playground URL is available at http://localhost:4000/graphql.

### Tests

To run unit tests:

```bash
pnpm test
```

To run tests with code coverage:

```bash
pnpm test:cov
```

To run end-to-end tests:

```bash
pnpm test:e2e
```

## Useful Scripts

Here are some additional scripts you can use:

`pnpm start:debug`: Starts the application in development mode with debugging support.
`pnpm lint`: Runs ESLint to analyze the code and find potential issues.
`pnpm prisma generate`: Generate prisma client from prisma schema
`pnpm prisma migrate dev`: To migrate the database
