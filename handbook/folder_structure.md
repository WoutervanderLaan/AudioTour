### Folder Structure

- **src/**
  - **app/** – app-wide setup: providers, routing, config
  - **shared/** – reusable, generic things
    - **components/** – buttons, inputs, icons
      - **ui/** – buttons, inputs, icons
      - **features/** – map, audioplayer, toast
    - **lib/** – helpers, utils, API clients
    - **types/** – global TypeScript types

  - **features/** – each feature gets its own self-contained folder
    - **auth/**
      - components/
      - hooks/
      - services/
      - types/
      - index.ts
    - **user/**
      - components/
      - hooks/
      - services/
      - types/
      - index.ts
  - **entities/** – domain models reused across features (optional)
  - **pages/** – top-level route components
