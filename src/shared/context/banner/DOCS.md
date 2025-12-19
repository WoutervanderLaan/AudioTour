# Banner Context

## Overview

The Banner Context provides a centralized banner notification system for the application. It allows any component to display a sticky banner at the top of the screen using the `useBanner` hook.

## Purpose

- Provide a consistent, app-wide banner notification system
- Enable showing/hiding banners from any component
- Support customizable banner content, variants, and actions
- Manage banner state and lifecycle centrally

## Architecture

### Files

- **BannerContext.types.ts**: TypeScript type definitions for banner props and context
- **BannerContext.tsx**: React Context creation
- **BannerContext.provider.tsx**: Provider component that manages banner state and renders the banner
- **useBanner hook** (in `@/shared/hooks/useBanner.ts`): Hook to access banner context

### How It Works

1. **BannerProvider** wraps the app at the root level (in `App.tsx`)
2. The provider maintains banner state and renders the `StickyBanner` component when content is set
3. Components use the `useBanner()` hook to show/hide banners
4. When `showBanner()` is called, the banner appears at the top of the screen
5. When `hideBanner()` is called or the user dismisses it, the banner disappears

## Usage

### Basic Example

\`\`\`tsx
import { useBanner } from '@/shared/hooks/useBanner';

function MyComponent() {
const { showBanner, hideBanner } = useBanner();

const handleAction = () => {
showBanner({
title: 'Action Complete',
message: 'Your action was successful!',
variant: 'success',
onDismiss: hideBanner,
});
};

return <Button onPress={handleAction} label="Do Something" />;
}
\`\`\`

### With Call-to-Action

\`\`\`tsx
const { showBanner } = useBanner();

showBanner({
title: 'Complete your profile',
message: 'Answer a few questions to personalize your experience',
ctaLabel: 'Get Started',
onCtaPress: () => navigation.navigate('Onboarding'),
onDismiss: () => dismissBanner(),
variant: 'info',
});
\`\`\`

### Managing Banner Lifecycle

\`\`\`tsx
import { useEffect } from 'react';
import { useBanner } from '@/shared/hooks/useBanner';

function ConditionalBanner() {
const { showBanner, hideBanner } = useBanner();
const { needsAttention } = useAppState();

useEffect(() => {
if (needsAttention) {
showBanner({
title: 'Attention Required',
message: 'Please review your settings',
variant: 'warning',
});
} else {
hideBanner();
}
}, [needsAttention, showBanner, hideBanner]);

return null;
}
\`\`\`

## API

### BannerContextType

\`\`\`typescript
type BannerContextType = {
showBanner: (banner: BannerProps) => void;
hideBanner: () => void;
}
\`\`\`

### BannerProps

\`\`\`typescript
type BannerProps = {
title: string;
message?: string;
ctaLabel?: string;
onCtaPress?: () => void;
onDismiss?: () => void;
variant?: 'info' | 'warning' | 'success';
testID?: string; // Optional test identifier for testing
}
\`\`\`

## Integration

The BannerProvider is integrated at the app level in \`src/app/App.tsx\`:

\`\`\`tsx
<BannerProvider>
<Init />
<RootNavigator />
</BannerProvider>
\`\`\`

This ensures the banner can be triggered from any screen in the app and will render consistently at the top of the screen.

## Examples in Codebase

- **Onboarding Banner** (\`src/modules/onboarding/components/OnboardingBanner.tsx\`): Displays a banner prompting users to complete onboarding, demonstrating conditional banner display with CTA and dismiss actions.

## Best Practices

1. **One banner at a time**: The system shows only one banner at a time. Calling \`showBanner()\` multiple times will replace the current banner with the new one (last-call-wins strategy).

2. **Avoid infinite loops**: When using \`showBanner()\` in \`useEffect\`, do NOT include callback functions (like \`handleCtaPress\`) in the dependency array. Instead, define callbacks inline or use only the primitive dependencies they need:

   \`\`\`tsx
   // ❌ WRONG - Creates infinite loop
   const handleCtaPress = useCallback(() => navigate('Route'), [navigate]);
   useEffect(() => {
   showBanner({ onCtaPress: handleCtaPress });
   }, [showBanner, handleCtaPress]); // handleCtaPress changes every render

   // ✅ CORRECT - Define callbacks inline
   useEffect(() => {
   showBanner({
   onCtaPress: () => navigate('Route'),
   });
   }, [showBanner, navigate]); // Only depend on stable values
   \`\`\`

3. **Clean up on unmount**: If a component shows a banner conditionally, use \`useEffect\` to hide the banner when conditions change.

4. **Handle dismiss**: Always provide an \`onDismiss\` handler to give users a way to close the banner.

5. **Use testID for testing**: When writing tests, provide a unique \`testID\` to identify specific banners:
   \`\`\`tsx
   showBanner({
   title: 'Test Banner',
   testID: 'onboarding-banner',
   });
   \`\`\`

6. **Use appropriate variants**:
   - \`info\`: General information or prompts
   - \`warning\`: Important notices or alerts
   - \`success\`: Confirmation of successful actions

7. **Keep messages concise**: Banner messages should be brief and actionable.

## Dependencies

- \`@/shared/components/features/banner/StickyBanner\`: The UI component used to render the banner
- React Context API for state management
