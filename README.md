# Dynamic Audio Tour App

## Overview

This repository hosts an AI-powered app that generates **dynamic audio tours** based on museum objects photographed by users. The app combines object recognition, contextual narrative generation, and personalized story sequences to offer engaging and interactive tours.

## Features

- **AI-Powered Object Recognition**
- **Personalized Narratives** for each object
- **Customizable Story Sequences**
- Integration with museum licensing for enhanced or limited user experiences

## Documentation

Comprehensive documentation for the project can be found in the repository. Refer to these key sections:

- [Project Overview](./handbook/project_overview.md)
- [Product Specification](./handbook/product_spec.md)
- [Research Notes](./handbook/research_notes.md)
- [Folder Structure](./handbook/folder_structure.md)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)
- iOS Simulator (macOS only, via Xcode)
- Android Studio (for Android development)
- Expo CLI (installed automatically via project dependencies)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd AudioTour
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables (optional):
   Create a `.env` file in the project root if you need to configure the API base URL:
   ```
   EXPO_PUBLIC_API_BASE_URL=http://localhost:8000
   ```

### Running the App

**Development server:**

```bash
npm start
```

**iOS (requires macOS and Xcode):**

```bash
npm run ios
```

**Android (requires Android Studio):**

```bash
npm run android
```

**Web:**

```bash
npm run web
```

**Clear cache and restart:**

```bash
npm run start:reset:cache
```

### Development Tools

**Linting and formatting:**

```bash
npm run lint          # Check for linting issues
npm run lint:fix      # Auto-fix linting issues
npm run format        # Check code formatting
npm run format:fix    # Auto-fix formatting issues
npm run typecheck     # Run TypeScript type checking
npm run validate      # Run all checks (lint, typecheck, format)
```

**Testing:**

```bash
npm test             # Run tests in watch mode
```

**Storybook:**

```bash
npm run storybook    # Start Storybook dev server on port 6006
```

### Project Structure

See [Folder Structure](./handbook/folder_structure.md) for detailed information about the codebase organization.

### Build Variants

The app supports three build variants controlled by the `APP_VARIANT` environment variable:

- `development` - Bundle ID: `com.woutervanderlaan.audiotour.dev`
- `preview` - Bundle ID: `com.woutervanderlaan.audiotour.preview`
- `production` - Bundle ID: `com.woutervanderlaan.audiotour`

All npm scripts use the `development` variant by default.

---

For additional resources and support, consult the documentation and handbook provided in this repository.
