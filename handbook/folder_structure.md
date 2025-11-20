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
  - **store/** – app wide store and context, and middleware configuration
      - context/
      - slices/
      - middleware/
  - **themes/** – app wide themes and styling configuration
      - **tokens/** - individual theme and styling tokens
