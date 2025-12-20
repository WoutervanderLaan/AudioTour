# src/core/lib/logger

Application logging utility with support for different log levels, colors, and table formatting.

## Purpose

Provides a centralized logging system for debugging and error tracking throughout the application. The logger includes:

- Multiple log levels (debug, info, success, warn, error)
- Color-coded console output for better readability
- Table formatting for structured data
- Grouped logs for related messages
- Production-safe logging (disabled by default in production)

## Files

- **logger.ts** - Main logger implementation with all logging methods
- **types.ts** - TypeScript types for logger configuration and log levels
- **config.ts** - Logger configuration (log level settings)
- **colorize.ts** - Color utilities for console output
- **formatPrefix.ts** - Formats log level prefixes with colors
- **formatTable.ts** - Formats data as ASCII tables
- **shouldLog.ts** - Determines if a message should be logged based on current log level
- **logger.test.ts** - Unit tests for logger functionality

## Usage

```ts
import {logger} from '@/core/lib/logger'

// Basic logging
logger.info('Server started', {port: 3000})
logger.success('User created successfully')
logger.warn('Deprecated API usage')
logger.error('Failed to connect', error)

// Table logging
logger.table([
  {name: 'Alice', age: 30, role: 'Developer'},
  {name: 'Bob', age: 25, role: 'Designer'},
])

// Grouped logs
logger.group('API Request')
logger.info('Method: GET')
logger.info('URL: /api/users')
logger.groupEnd()
```
