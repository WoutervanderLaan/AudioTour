# src/shared/components/ui/banner

This folder contains banner UI components for displaying sticky notifications and alerts at the top of the screen.

## Purpose

The banner components provide a consistent way to display important messages, notifications, or calls-to-action to users. These banners are designed to be sticky (remain visible at the top) and can be dismissed or include interactive elements.

## Components

- **StickyBanner.tsx** - Main sticky banner component with customizable variants (info, warning, success), optional CTA button, and dismiss functionality
- **StickyBanner.stories.tsx** - Storybook stories for the StickyBanner component

## Usage

The StickyBanner component is typically used through the BannerContext and useBanner hook:

```tsx
import {useBanner} from '@/shared/hooks/useBanner'

const MyComponent = () => {
  const {showBanner} = useBanner()

  showBanner({
    title: 'Welcome!',
    message: 'Check out our new features',
    variant: 'info',
    ctaLabel: 'Learn More',
    onCtaPress: () => console.log('CTA pressed'),
  })
}
```

See the BannerContext documentation at `src/shared/context/banner/` for more details on the banner system.
