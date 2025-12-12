import type React from 'react'
import {useCallback} from 'react'

import {useNavigation} from '@react-navigation/native'

import {StickyBanner} from '../ui/banner'

import {useOnboardingStore} from '@/modules/onboarding/store/useOnboardingStore'

/**
 * OnboardingBanner
 * Displays a sticky banner prompting users to complete onboarding.
 * Only shows if onboarding is incomplete and not dismissed.
 * Navigates to the onboarding flow when the CTA is pressed.
 *
 * @returns {React.JSX.Element | null} The onboarding banner or null if not needed
 */
export const OnboardingBanner = (): React.JSX.Element | null => {
  const navigation = useNavigation()
  const {completed, dismissed, dismissBanner} = useOnboardingStore()

  /**
   * handleCtaPress
   * Navigates to the onboarding flow screen
   */
  const handleCtaPress = useCallback((): void => {
    navigation.navigate('OnboardingFlow' as never)
  }, [navigation])

  /**
   * handleDismiss
   * Dismisses the banner temporarily
   */
  const handleDismiss = useCallback((): void => {
    dismissBanner()
  }, [dismissBanner])

  // Don't show banner if onboarding is completed or if it was dismissed
  if (completed || dismissed) {
    return null
  }

  return (
    <StickyBanner
      title="Complete your profile"
      message="Answer a few questions to personalize your experience"
      ctaLabel="Get Started"
      onCtaPress={handleCtaPress}
      onDismiss={handleDismiss}
      variant="info"
      testID="onboarding-banner"
    />
  )
}
