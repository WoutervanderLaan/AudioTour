import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {StickyBanner} from './StickyBanner'
import {logger} from '@/core/lib/logger/logger'

const meta = {
  title: 'Features/StickyBanner',
  component: StickyBanner,
  tags: ['autodocs'],
} satisfies Meta<typeof StickyBanner>

export default meta

/**
 * Story
 * Storybook story type for StickyBanner component
 */
type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: {
    testID: 'StoryInfoStickyBanner',
    title: 'Complete your profile',
    message: 'Answer a few questions to personalize your experience',
    ctaLabel: 'Get Started',
    onCtaPress: (): void => {
      logger.debug('CTA pressed')
    },
    onDismiss: (): void => {
      logger.debug('Banner dismissed')
    },
    variant: 'info',
  },
}

export const Warning: Story = {
  args: {
    testID: 'StoryWarningStickyBanner',
    title: 'Action Required',
    message: 'Please verify your email address',
    ctaLabel: 'Verify Now',
    variant: 'warning',
    onCtaPress: (): void => {
      logger.debug('CTA pressed')
    },
  },
}

export const Success: Story = {
  args: {
    testID: 'StorySuccessStickyBanner',
    title: 'Profile Updated',
    message: 'Your changes have been saved successfully',
    variant: 'success',
    onDismiss: (): void => {
      logger.debug('Banner dismissed')
    },
  },
}

export const WithoutMessage: Story = {
  args: {
    testID: 'StoryWithoutMessageStickyBanner',
    title: 'New feature available!',
    ctaLabel: 'Learn More',
    onCtaPress: (): void => {
      logger.debug('CTA pressed')
    },
  },
}

export const WithoutCTA: Story = {
  args: {
    testID: 'StoryWithoutCTAStickyBanner',
    title: 'System Maintenance',
    message: 'We will be performing maintenance tonight from 2-4 AM',
    onDismiss: (): void => {
      logger.debug('Banner dismissed')
    },
  },
}

export const NotDismissible: Story = {
  args: {
    testID: 'StoryNotDismissibleStickyBanner',
    title: 'Complete Onboarding',
    message: 'You must complete onboarding to continue',
    ctaLabel: 'Start Onboarding',
    variant: 'info',
  },
}
