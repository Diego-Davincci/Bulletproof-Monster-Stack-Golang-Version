# Fronted - Bulletproof Monster Stack 🔥

**Feature based architecture !!**

## Libraries

- Tanstck Router
- Tanstack Query
- TailwindCSS
- ShadcnUI (not an actual dependencie)
- Zustand

## ¿ Docs ?

- JSdoc for React
- Codebase structure

## Testing

- Unit test with ¿vitest? ¿jest?

**What to Test**

✅ User interactions
✅ API calls and responses
✅ State management
✅ Error handling
✅ Edge cases

❌ Implementation details
❌ Third-party libraries
❌ Styling`,

Write tests for business logic!!!

## Architecture - Feature (Domain Oriented) based layers

```
src/
├── features/ # Feature modules
│ ├── auth/
│ │ ├── components/
│ │ │ ├── LoginForm.tsx
│ │ │ └── RegisterForm.tsx
│ │ ├── hooks/
│ │ │ ├── useAuth.ts
│ │ │ └── useLogin.ts
│ │ ├── services/
│ │ │ └── authService.ts
│ │ ├── store/
│ │ │ └── authStore.ts
│ │ ├── types/
│ │ │ └── auth.types.ts
│ │ └── utils/
│ │ └── authUtils.ts
│ ├── dashboard/
│ │ ├── components/
│ │ ├── hooks/
│ │ └── ...
│ └── products/
│ ├── components/
│ ├── hooks/
│ └── ...
│
├── components/ # Shared/common components
│ ├── ui/ # Shadcn components
│ │ ├── button.tsx
│ │ ├── card.tsx
│ │ └── ...
│ ├── layout/
│ │ ├── Header.tsx
│ │ ├── Sidebar.tsx
│ │ └── Footer.tsx
│ └── common/
│ ├── DataTable.tsx
│ ├── ErrorBoundary.tsx
│ └── LoadingSpinner.tsx
│
├── hooks/ # Global custom hooks
│ ├── useDebounce.ts
│ ├── useLocalStorage.ts
│ └── useMediaQuery.ts
│
├── lib/ # Library configurations & utilities
│ ├── api/
│ │ ├── client.ts # Axios/Fetch instance
│ │ └── queryClient.ts # TanStack Query config
│ ├── utils.ts # Tailwind cn() and utilities
│ └── constants.ts
│
├── routes/ # TanStack Router routes
│ ├── \_\_root.tsx
│ ├── index.tsx
│ ├── auth/
│ │ ├── login.tsx
│ │ └── register.tsx
│ └── dashboard/
│ ├── index.tsx
│ └── settings.tsx
│
├── services/ # API services (HTTP requests)
│ ├── api/
│ │ ├── users.ts
│ │ ├── products.ts
│ │ └── orders.ts
│ └── index.ts
│
├── store/ # Zustand stores
│ ├── authStore.ts
│ ├── uiStore.ts
│ └── index.ts
│
├── types/ # Global TypeScript types
│ ├── api.types.ts
│ ├── common.types.ts
│ └── index.ts
│
├── styles/ # Global styles
│ └── index.css
│
├── utils/ # Utility functions
│ ├── formatters.ts
│ ├── validators.ts
│ └── helpers.ts
│
├── config/ # App configuration
│ ├── env.ts
│ └── app.config.ts
│
├── main.tsx
└── routeTree.gen.ts # Auto-generated
```
