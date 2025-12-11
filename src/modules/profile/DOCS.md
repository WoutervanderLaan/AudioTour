# Profile Module

## Overview

The profile module provides user profile functionality for the AudioTour app.

## Features

- **Profile Screen**: Displays user profile information and settings

## Navigation

### Stack Screens

- `Profile` - Main profile screen showing user information

## Dependencies

- `auth` - Requires the authentication module for user state

## Usage

The profile screen is accessed via the profile icon button in the header navigation. When tapped:

- If the user is authenticated, they are navigated to the Profile screen
- If the user is not authenticated, they are navigated to the Login screen

## Future Enhancements

- User avatar display and editing
- Profile settings management
- Account preferences
- Logout functionality from profile
