# 🚀 PROJECT SETUP GUIDE

This project serves as a guide on how I set up every new project, following best practices to ensure code quality and maintainability.

## 📜 Table of contents

1. [**Enforcing Code Standards**](/configs/code-standards). Here I specified how to setup Husky to automatically run Prettier & ESLint before every commit. With this we guarantee the quality of our code.

2. [**Project Architecture**](/configs/folder-structure). Here I talk about different folder strucuters and which one could fit better the project needs.

## Otther Topics

### Component Naming Pattern: BASE + COMPOSITE + SUFFIX

This convention breaks component names into three meaningful parts:

- `BASE`: The core entity or subject the component relates to (e.g., `User`, `Product`, `Dashboard`).

- `COMPOSITE`: Additional information describing the component’s role or relation (e.g., `Profile`, `Header`, `Messages`).

- `SUFFIX`: The type of UI element or its role in the system (e.g., `Card`, `List`, `Form`).

### File Naming Conventions

1. **Components**

- Use kebab-case for files: `exercise-card.tsx`
- Use PascalCase for component names: `ExerciseCard`

2. **Utilities and Hooks**

- Use kebab-case for files: `use-exercise.ts`
- Prefix hooks with `use`: `useExercise`

3. **Types**

- Use kebab-case for files: `exercise-types.ts`
- Use PascalCase for type names: `Exercise`

### API Design Best Practices

**Error Handling:** Use precise status codes and detailed messages, while ensuring no sensitive information is exposed.

- ❌ ErrorMessage: Something went wrong
- ✅ ErrorMessage: User not found. ID does not exist.

**Consistent naming:** Choose a convention and stick with it. Follow RESTful conventions.

- ❌ /create_user, /getUserDetail
- ✅ POST /users, GET /users/:id

**Controlled Fetching:** Enable data filtering through query parameters. Excessive or insufficient data can degrade performance.

- ❌ Over-fetching / Under-fetching: /users/{id}
- ✅ Use query parameters: GET /users/{id}?fields=name,email.

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

### How to virtualize large lists

```tsx
import { FixedSizeList as List } from 'react-window';

const list = [...]; // 10k items here
const Row = ({index, style}) => (
  <div>
    <User user={list[index]} />
  </div>
);

const ExpensiveList = () => (
  <List height={150} itemCount={10000} itemSize={35} width={300}>
    {Row}
  </List>
);
```
