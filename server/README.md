# Backend for Bulletproof Monster Stack 🔥

## API goal

write down here what the API is being build for the client...

### Core Libraries 📚

- Express 👉 To create fully our API (routing, middlewares etc..)
- Drizzle ORM and Pg 👉 To handle DB communication, operations, migrations (we're using postgres)
- Passport and Passport-google-oauth20 👉 To handle OAUTH flow with providers such as google
- Morgan 👉 Server logging
- Jsonwebtoken 👉 To create JWT for auth
- Cors 👉 Block unknown requests from websites

### Feature based | Domain-Oriented Architecture

```
src/
├── index.ts     # Main server API setup
├── modules/     # Features separated by folders
│   ├── _shared/
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
