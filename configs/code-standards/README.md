# Enforcing Code Standards

To maintain a **consistent code style** and **prevent bad commits**, we will be using:

- [**Prettier**](https://prettier.io/): Automatically formats code for consistency.
- [**ESLint**](https://eslint.org/): Statically analyzes code to detect and fix problems.
- [**lint-staged**](https://github.com/lint-staged/lint-staged): Ensures Git hooks run only on staged files.

### Step 1: Install Dependencies

Run the following command to install the necessary packages:

```bash
npm install --save-dev husky lint-staged prettier @commitlint/{cli,config-conventional}
```

### Step 2: Initialize Husky

Initialize Husky, which will create the necessary configuration files:

```bash
npx husky-init && npm install
```

This will generate a .husky/ directory with a default pre-commit hook.

### Step 3: Create Git Hooks

Inside .husky/, you can create different hook files depending on when you want to run your scripts.
For example, if you want to enforce checks before committing, create a pre-commit file (without any extension) and specify the commands to run.

**Example: `commit-msg` Hook (Validates commit messages)**

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit
```

**Example: `pre-commit` Hook (Runs linting & formatting on staged files)**

```bash
npx lint-staged --allow-empty
```

### Step 4: Configure lint-staged

Now, configure lint-staged to use Prettier and ESLint.
Edit your package.json and add the following:

```json
{
  "scripts": {
    "prepare": "husky install"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx,json,css,scss,md}": ["prettier --write", "eslint --fix"]
  }
}
```

### Step 5: Configure commitlint

To validate commit messages we have to configure commitlint, so create a new file named `.commitlintrc.json`

```json
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "type-enum": [
      2,
      "always",
      [
        "ci",
        "chore",
        "docs",
        "ticket",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style"
      ]
    ]
  }
}
```

## 🎯 Final Thoughts

By setting up these tools, we ensure that our code is always formatted correctly and follows best practices before committing changes.
This prevents unnecessary formatting issues and helps maintain high code quality across the team.
