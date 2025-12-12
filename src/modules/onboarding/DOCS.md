# Onboarding Module

## Overview

The onboarding module provides a multi-step configuration flow that helps personalize the user's experience with the AudioTour app. It collects user preferences regarding museum experience level, learning style, interests, tour length, and accessibility needs.

## Features

### Multi-Step Form Flow

- **Dynamic Step Configuration**: Each onboarding step is configured in `config/steps.ts` and can be easily modified or extended
- **Multiple Input Types**: Supports radio button selections, toggle switches, and text inputs
- **Progress Tracking**: Visual progress indicator shows users how far they've progressed
- **Step Navigation**: Users can navigate back to previous steps or skip the entire flow
- **Form Validation**: Built-in validation using Zod schemas ensures data quality

### Persistent State Management

- **Zustand Store**: Answers are stored in a Zustand store with AsyncStorage persistence
- **Completion Tracking**: Tracks whether onboarding has been completed
- **Banner Dismissal**: Users can temporarily dismiss the onboarding banner

### User Interface Components

- **Onboarding Banner**: Sticky banner that prompts incomplete onboarding
  - Displays on screens when onboarding is incomplete
  - Can be dismissed temporarily
  - Includes a call-to-action to start onboarding
- **Profile Integration**: NavItem in profile settings for easy access to preferences

## Architecture

### Module Structure

```
src/modules/onboarding/
├── config/
│   └── steps.ts              # Onboarding step configuration
├── screens/
│   └── OnboardingFlowScreen.tsx  # Multi-step form screen
├── store/
│   └── useOnboardingStore.ts     # Zustand store with persistence
├── DOCS.md                   # This file
├── index.ts                  # Module configuration export
├── routes.types.ts           # Route type definitions
├── screenConfig.ts           # Screen navigation configuration
└── types.ts                  # Type definitions
```

### State Management

The onboarding store (`useOnboardingStore`) manages:

- **answers**: Record of user responses keyed by question ID
- **completed**: Boolean indicating if onboarding is complete
- **dismissed**: Boolean for temporary banner dismissal

### Step Configuration

Steps are defined in `config/steps.ts` with the following structure:

```typescript
{
  id: string                    // Unique identifier
  type: OnboardingStepType      // 'radio' | 'toggle' | 'text'
  title: string                 // Step title
  description: string           // Step description
  required?: boolean            // Whether step is required
  options?: RadioOption[]       // Options for radio type
  placeholder?: string          // Placeholder for text type
}
```

## Usage

### Accessing Onboarding State

```typescript
import {useOnboardingStore} from '@/modules/onboarding/store/useOnboardingStore'

const {answers, completed, setAnswer, completeOnboarding} =
  useOnboardingStore()
```

### Displaying the Onboarding Banner

The `OnboardingBanner` component automatically shows when onboarding is incomplete:

```typescript
import {OnboardingBanner} from '@/shared/components/features'

export const MyScreen = () => (
  <Screen.Static>
    <OnboardingBanner />
    {/* Rest of screen content */}
  </Screen.Static>
)
```

### Navigating to Onboarding Flow

```typescript
import {useNavigation} from '@react-navigation/native'

const navigation = useNavigation()
navigation.navigate('OnboardingFlow')
```

### Adding New Onboarding Steps

1. Add a new step configuration to `config/steps.ts`:

```typescript
{
  id: 'new_preference',
  type: OnboardingStepType.RADIO,
  title: 'Your question?',
  description: 'Additional context',
  required: true,
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ],
}
```

2. The step will automatically appear in the onboarding flow
3. Answers are automatically persisted to the store

## Integration Points

### Profile Screen

The profile screen displays:

- OnboardingBanner at the top when incomplete
- NavItem in settings to access preferences

### Module Registration

The module is registered in `src/modules/modules.ts`:

```typescript
moduleRegistry.register(onboardingModule)
```

### Navigation

Routes are registered through the module's `screenConfig.ts`:

- **OnboardingFlow** (Stack): Multi-step onboarding form

## Data Model

### Onboarding Questions

The current onboarding flow collects:

1. **Experience Level**: User's familiarity with museums
   - Options: beginner, intermediate, advanced
2. **Preferred Style**: Learning preference
   - Options: storytelling, factual, conversational
3. **Interests**: Primary area of interest
   - Options: art, history, science
4. **Tour Length**: Preferred visit duration
   - Options: short (30-45 min), medium (1-2 hours), long (2+ hours)
5. **Accessibility**: Accessibility feature preferences
   - Type: Toggle switch

### Answer Storage

Answers are stored as a flat key-value record:

```typescript
{
  experience_level: 'intermediate',
  preferred_style: 'storytelling',
  interests: 'art',
  tour_length: 'medium',
  accessibility: true
}
```

## Dependencies

### Internal Dependencies

- `@/shared/components/ui/form`: Form input components
- `@/shared/components/ui/banner`: Banner UI component
- `@/shared/components/ui/navigation`: Navigation components
- `@/store/createStore`: Store creation utility

### External Dependencies

- `react-hook-form`: Form state management
- `zod`: Schema validation
- `zustand`: State management
- `@react-navigation/native`: Navigation

## Best Practices

### Modifying Steps

When modifying onboarding steps:

1. Update step configuration in `config/steps.ts`
2. Consider backward compatibility if users have partial answers
3. Test the flow with validation enabled
4. Update this documentation

### Extending the Module

To add new features:

1. Follow the existing pattern in similar modules (e.g., auth)
2. Update type definitions in `types.ts`
3. Add new actions to the store if needed
4. Document changes in this file

### Testing Onboarding

To test onboarding flow:

1. Reset store: `useOnboardingStore.getState().reset()`
2. Navigate to Profile screen to see the banner
3. Click "Get Started" or the NavItem to begin
4. Test step navigation, validation, and completion

## Future Enhancements

Potential improvements:

- [ ] Add onboarding analytics tracking
- [ ] Support for conditional steps based on previous answers
- [ ] Allow users to update preferences after completion
- [ ] Add onboarding completion celebration screen
- [ ] Support for A/B testing different onboarding flows
- [ ] Multi-language support for questions
