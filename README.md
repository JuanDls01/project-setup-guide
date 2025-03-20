# 🚀 PROJECT SETUP GUIDE

This project serves as a guide on how I set up every new project, following best practices to ensure code quality and maintainability.

## 📜 Table of contents

1. [**Enforcing Code Standards**](/configs/code-standards). Here I specified how to setup Husky to automatically run Prettier & ESLint before every commit. With this we guarantee the quality of our code.

2. [**Project Architecture**](/configs/folder-structure). Here I talk about different folder strucuters and which one could fit better the project needs.

## Otther Topics

### Component Naming Pattern: BASE + COMPOSITE + SUFFIX

This convention breaks component names into three meaningful parts:

BASE: The core entity or subject the component relates to (e.g., `User`, `Product`, `Dashboard`).

COMPOSITE: Additional information describing the component’s role or relation (e.g., `Profile`, `Header`, `Messages`).

SUFFIX: The type of UI element or its role in the system (e.g., `Card`, `List`, `Form`).

### Event Types

eventTypes.ts

```ts
type FormEvent = React.FormEvent<HTMLFormElement>;
type MouseEvent = React.MouseEvent<HTMLButtonElement>;
type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export { FormEvent, MouseEvent, ChangeEvent };
```

### Invariant fc

❌ Avoid deeply nested validations that are hard to read.

✅ Instead use invariants.

```ts
function invariant(condition: any, message?: string) {
  if (condition) {
    return;
  }
  throw new Error(message);
}

async function authenticateUser(credentials: {
  username: string;
  password: string;
}) {
  const { username, password } = credentials;

  invariant(
    username && username.length >= 3,
    "Username must be at least 3 characters long"
  );
}
```
