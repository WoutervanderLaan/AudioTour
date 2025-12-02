# AGENT.md – Global Agent Guidelines

This document defines how AI agents should work inside this repository.

---

## 1. Repository Purpose

This codebase powers a React Native (Expo) App. For all project specific documentation, consult the [readme](./README.md) and the [project handbook](./handbook)

The codebase should remain clean, modular, explainable, and well-tested.

---

## 2. Architecture Overview

- `/src` – entry for all source files
  - `/app` – global app entry, initialization, and navigation configuration
  - `/shared` – globally shared elements like components, types, utilities, and React Context providers
  <!-- - `/features` – separate features and scoped elements --> TODO: deprecated, needs update
  - `/store` – global Zustand state management with slices and middleware
  - `/themes` – theme tokens and styling configuration (react-native-unistyles)
- `/handbook` – project documentation

For a detailed overview of the folder structure, consult the handbook: [Folder Structure](./handbook/folder_structure.md)

---

## 3. Linting & Commit Standards (Important)

The following rules are strictly enforced:

### JSDoc

Every function, class, hook, and utility **must have complete JSDoc.**

Include:

- `@param`
- `@returns`
- description
- edge cases

### Folder documentation

Every folder **must include a DOCS.md file** documenting its purpose and individual module responsibilities.

### ESLint

The repository uses:

- custom rules
- boundaries rules
- JSDoc rules
- unused-imports
- consistent type usage

Agents must write code that passes ESLint without requiring suppression.

### Husky

Pre-commit hooks validate:

- formatting
- lint rules
- type checking

Agents should run and fix lint issues **before finalizing code**.

---

## 4. Testing Requirements

For any added or modified functionality:

- Agents must update or create tests
- Tests should match the existing patterns
- If tests fail, Agents must iterate until the suite passes

---

## 5. Git Branching & Pull Requests

The agent will usually be invoked on explicitly created branches.

### Branching

Branch name format:
ai/<trello-card-id>-<timestamp-or-run-id>

### Commit style

Use conventional commits:

- `feat:` new feature
- `fix:` bug fix
- `refactor:` refactor
- `docs:` documentation update
- `test:` test additions
- `chore:` internal updates

### Pull Requests

Agents must:

- open a PR when complete
- provide a clear explanation of the changes
- reference the Trello card
- list all files it added or modified

---

## 6. Code Style

- Prefer functional, composable patterns
- Keep functions small and modular
- Avoid side effects
- Strong typing with TypeScript
- No unused exports
- Write clear descriptive names
- Keep components clean

---

## 7. Do Not

- Do not disable linting rules
- Do not skip tests
- Do not create undocumented folders
- Do not leave TODOs without explanation
- Do not introduce breaking changes without a migration note

---

## 8. How Agents Should Work

When assigned a task, Agents must:

1. Analyze the repo and understand existing patterns
2. Use code search to find relevant files
3. Modify, add, or refactor code fully
4. Maintain architectural consistency
5. Write or update tests
6. Ensure all lint rules pass
7. Commit changes in logical chunks
8. Open a PR with explanation
9. Stop after PR creation

If a rule is unclear, Agents must infer the intent based on the codebase.

---

# End of AGENT.md
