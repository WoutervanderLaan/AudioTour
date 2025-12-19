# src/modules/tour/services

Service layer for tour-related operations.

## Purpose

Contains service classes that encapsulate business logic and external integrations for tour functionality, particularly camera and media library access.

## Contents

- **cameraService.ts** - Singleton service for camera and photo library operations:
  - `requestCameraPermission()` - Request camera permission from user
  - `requestLibraryPermission()` - Request media library permission
  - `checkCameraPermission()` - Check current camera permission status
  - `checkLibraryPermission()` - Check current library permission status
  - `launchCamera()` - Launch camera to capture photo
  - `launchLibrary()` - Launch photo library picker
  - `openSettings()` - Open device settings for permission management
  - Uses Expo ImagePicker for React Native compatibility
