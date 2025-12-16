# Backend for Bulletproof Monster Stack 🔥

## Libraries

- Express

## ¿ Docs ?

- Swagger
- Codebase structure

## ¿ Testing ?

- Unit test with ¿vitest? ¿jest?

## Feature based, Domain-Oriented Architecture

```
src/
├── app.ts                   # Entry point of the Express app (main application setup)
├── server.ts                # Server bootstrapping (server listening on ports)
├── modules/
│   ├── _shared/
│   │   ├── base.repository.ts  # Base repository class (common DB interactions)
│   │   └── errors.ts           # Utility functions for error handling (e.g., custom error classes)
│   ├── user/
│   │   ├── user.routes.ts      # API routes for user-related endpoints
│   │   ├── user.controller.ts  # Controllers to handle requests and delegate business logic to services
│   │   ├── user.service.ts     # Core business logic for managing users
│   │   ├── user.repository.ts  # Data access layer, interacts with the database for user-related queries
│   │   └── user.schema.ts      # Drizzle schema definitions for user table
│   └── auth/
│       ├── auth.routes.ts      # Routes for authentication endpoints (e.g., login, register)
│       ├── auth.service.ts     # Auth-related business logic (e.g., generating JWT)
│       └── auth.controller.ts  # Controllers for authentication
├── db/
│   ├── client.ts             # Database client setup (Drizzle configuration, connection)
│   └── schema.ts             # Global database schema definitions (e.g., common types, models)
├── middlewares/
│   ├── error.middleware.ts    # Global error handler middleware
│   └── auth.middleware.ts     # Middleware to authenticate requests (e.g., JWT token verification)
├── utils/
│   ├── env.ts                # Configuration setup (loading environment variables)
│   └── logger.ts             # Logger utility (to centralize logging configuration)
└── tests/
    └── user.test.ts           # Unit and integration tests for user module
```
