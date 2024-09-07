# WebChat Frontend

## Description

This is the frontend of the **WebChat** application, built with React, providing real-time messaging and friend management functionalities. It communicates with a backend GraphQL API and leverages `graphql-ws` for real-time communication.

## Prerequisites

Ensure the following tools are installed on your machine:

- **Node.js** (version 22.x or higher)
- **pnpm** (instead of npm or yarn)
- **Docker** and **Docker Compose** (for running the application via containers)

## Setup

Clone the project repository:

```bash
git clone https://github.com/Edofo/webchat
```

Navigate to the Frontend Directory

```bash
cd webchat-front
```

Install dependencies

If you are not using Docker Compose, you can install the project dependencies manually using `pnpm`:

```bash
pnpm install
```

## Configuration

Create a .env file at the root of the project and add the necessary environment variables. 
An example is already provided in `.env.example`.

## Start the Backend

Before starting the frontend, make sure the backend server is up and running. For backend setup and instructions, refer to the backend README [here](../webchat-back/README.md).

## Running the Application

To start the frontend in development mode:

```bash
pnpm dev
```

To build the frontend in production mode:

```bash
pnpm build
```

This will launch the application at `http://localhost:3000`.

You can also run the frontend with Docker Compose. To do so, ensure Docker and Docker Compose are installed and run the following commands:

```bash
docker-compose up -d --build
```

This will launch the application at `http://localhost:80`.


## Preview the Production Build

To preview the production build locally, you can use:

```bash
pnpm preview
```

## Running Tests

To run unit tests:

```bash
pnpm test
```

For code coverage reports:

```bash
pnpm test:coverage
```

## Useful Scripts

Here are some additional scripts you can use during development and deployment:

- `pnpm dev`: Starts the application in development mode.
- `pnpm build`: Builds the application for production.
- `pnpm lint`: Runs ESLint to analyze and fix potential code issues.
- `pnpm test`: Runs the unit tests.
- `pnpm test:coverage`: Runs tests and generates code coverage reports.
- `pnpm prepare`: Husky hooks for pre-commit checks.
- `pnpm generate`: Runs GraphQL code generation using the configuration in `client/codegen.ts`.
