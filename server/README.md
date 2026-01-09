# Backend for Bulletproof Monster Stack 🔥

## API goal

...

### Core Libraries 📚

- Chi 👉 Handle routing, middlewares, grouping...
- Postgres + pgx + sqlc + goose 👉 To handle DB communication, operations, migrations (we're using postgres)
- oauth2 + golang-jwt 👉 To handle OAUTH flow with providers such as google
- go-chi/cors 👉 Block unknown requests from websites

### Feature based | Domain-Oriented Architecture

The API has a feature based architecture to separate specific concerns, logic, and functions in order to have files and folders with unique and specific goals

- Controller Layer 👉 Handle incoming requests, validate data input, generate appropiate responses
- Service Layer 👉 Handle all bussines logic
- Repository Layer 👉 Handle the data layer by accessing the DB

<br/>

```
src/
├── index.ts    # Main API setup
│
├── config/                   # 🔧 Configuration files
│   ├── auth.config.ts        # Auth settings (tokens, cookies, validation rules)
│   └── passport.config.ts    # Passport strategies setup (Google OAuth)
|
├── db/                       # 🗄️ Database layer (centralized)
│   ├── client.ts             # Drizzle ORM client initialization & pool
│   ├── schema.ts             # All table definitions (users, auth_providers)
│   └── migrations/           # Auto-generated Drizzle migrations (version-controlled)
│
├── middlewares/              # ⚙️ Express middlewares
│   └── auth.middleware.ts    # JWT verification & token refresh logic
│
├── modules/                  # 🎯 Feature modules (domain-driven)
│   ├── _shared/              # Shared utilities across modules
│   │
│   └── auth/                           # Authentication feature
|       ├── __tests__                   # Provide meaningful and isolated test cases for every layer
│       ├── auth.routes.ts              # All auth endpoints
│       ├── auth.controller.ts          # Request handlers & response formatting
│       ├── auth.service.ts             # Core business logic
│       └── auth.repository.ts          # Database queries specific to auth (user lookups)
│
├── types/                    # 📝 TypeScript type definitions
│   └── index.ts              # Global type exports & interfaces
│
├── utils/                    # 🛠️ Utility functions
│   ├── env.ts                # Environment variables loader & type-safe access
│   ├── constants.ts          # App constants (production flag, HTTP codes)
│   ├── json.ts               # Standardized JSON response builder
│   ├── token.ts              # Token creation, verification & cookie management
│
```
