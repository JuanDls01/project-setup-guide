# 📌 Project Architecture Guide

## 🔎 Introduction

When starting a new project, one of the first and most crucial steps is to define a proper folder structure. A well-organized structure improves maintainability, scalability, and overall developer experience. The folder organization can follow different approaches, such as:

- [**By Type:**](#by-type) Organizing files by their type (e.g., components, hooks, services, etc.).

- [**By Type & Feature:**](#by-type-&-feature) Combining type-based organization with feature-based modules.

- [**Screaming Architecture:**](#screaming-architecture) Prioritizing business domains over technical concerns.

Each approach has its own advantages and is suited for different scenarios. Below, we discuss these structures with examples and when to use each.

## By Type

A traditional approach where files are grouped by their function/type. Best suited for small projects or prototypes where structure simplicity is preferred.

```
/src
│── /components         # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
|   |── PaymentForm.tsx
|   └── SignUpForm.tsx
│── /hooks              # Custom hooks
│   ├── useFetch.ts
│   ├── useAuth.tsx
│   ├── usePayment.tsx
|   └── useEmployees.ts
│── /services           # API calls and business logic
│   └── api.ts
│── /context            # Context providers
│   └── AuthContext.tsx
│── /utils              # Utility functions
│   └── formatDate.ts
│── /types              # TypeScript interfaces and types
│   └── index.ts
│── /screens || /pages  # Pages or screens in the app
│   ├── Home.tsx
│   └── Profile.tsx
|── /assets
|── /api
│── /config             # App configurations
└── /lib
```

✅ **Pros**:

- Easy to navigate for small to medium-sized projects.
- Clear separation of concerns.

❌ **Cons**:

- Can become difficult to manage in larger projects.
- Features are fragmented across multiple directories.

## By Type & Feature

A hybrid approach where each feature/module contains its own substructure, while still maintaining type-based folders for shared resources. Ideal for medium to large-scale projects where modularity is crucial.

```
src/
│── components/         # Reusable UI components
|   |── auth/
|   |   └── SignUpForm.tsx
|   |── payment/
|   |   └── PaymentForm.tsx
|   |── employees/
│   |   ├── EmployeeList.tsx
|   |   └── EmployeeSummay.tsx
│   ├── Button.tsx
│   └── Card.tsx
│── hooks/              # Custom hooks
|   |── auth/
|   |   └── useAuth.tsx
|   |── payment/
|   |   └── usePayment.tsx
|   |── employees/
|   |   └── useEmployees.ts
│   └── useFetch.ts
│── /services           # API calls and business logic
│── /context            # Context providers
│── /utils              # Utility functions
│── /types              # TypeScript interfaces and types
│── /screens || /pages  # Pages or screens in the app
|── /assets
|── /api
│── /config             # App configurations
└── /lib
```

✅ **Pros**:

- Keeps feature-related code together.
- Enhances maintainability and scalability.
- Still allows for shared global utilities.

❌ **Cons**:

- Slightly more complex than pure type-based structure.

## Screaming Architecture

Prioritizes business domains over technical concerns, making it clear what the application does from the folder structure. Best for enterprise-level projects or domain-driven applications.

```
src/
|── modules/
|   │── core/
|   |   |── components/
|   |   |── design-system/
|   |   |   └── Button.tsx
|   |   |── hooks/
|   |   |── lib/
|   |   └── utils/
|   │── payment/
|   |   |── components/
|   |   |   └── PaymentForm.tsx
|   |   |── hooks/
|   |   |   └── usePayment.tsx
|   |   |── lib/
|   |   |── services/
|   |   └── utils/
|   │── employees/
|   |   |── components/
│   |   |   ├── EmployeeList.tsx
|   |   |   └── EmployeeSummay.tsx
|   |   |── hooks/
|   |   |   └── useEmployees.tsx
|   |   |── lib/
|   |   |── services/
|   |   └── utils/
```

```
src/
|── exercise/               # Exercise Domain
|   |── components/         # UI components specific to exercises
|   |── api/                # API interactions for exercises
|   |── types/              # Type definitions
|   |── hooks/              # Custom hooks
|   |── utils/              # Utility functions
|   └── context/            # State management
|── workout/                # Workout domain
|   |── components/
|   |── api/
|   |── types/
|   |── hooks/
|   |── utils/
|   └── context/
|── user/                   # User domain
|   |── components/
|   |── api/
|   |── types/
|   └── context/
|── shared/                 # Shared resources
|   |── ui/                 # Reusable UI components
|   |── utils/              # Common utilities
|   |── hooks/              # Shared hooks
|   └── types/              # Common types
```

✅ **Pros**:

- Reflects the business domains of the application.
- Helps teams focus on features rather than technical layers.
- Enhances scalability for large projects.

❌ **Cons**:

- Can be confusing for developers used to type-based structures.
- Requires clear documentation and onboarding for new team members.

### Rules

1. **Domain-First Organization**

   - Each major feature/domain should have its own top-level directory in `src/`
   - Domain names should be clear and descriptive of the business functionality
   - Example: `exercise/`, `workout/`, `user/`, etc.

2. **Domain Module Structure**

   - Each domain module should be self-contained
   - Common internal structure:
     - `components/` - UI components specific to the domain
     - `api/` - API interactions and data fetching
     - `types/` - TypeScript types and interfaces
     - `hooks/` - Custom React hooks
     - `utils/` - Domain-specific utilities
     - `context/` - State management

3. **Shared Resources**

   - Common code used across multiple domains goes in `shared/`
   - UI components that are used by multiple domains should be in `shared/ui/`
   - Utility functions used across domains go in `shared/utils/`

4. **Import Rules**
   - Components should import from their own domain first
   - Cross-domain imports should use path aliases
   - Shared components should be imported from `@shared/*`

🚀 Conclusion

The best folder structure depends on the project's size, complexity, and team workflow.

Choosing the right architecture early helps maintain code quality and improves development efficiency.

Feature-Based Folder Structure
