import type React from 'react'
import {useCallback, useEffect} from 'react'

import {OnboardingRouteName} from '@/modules/onboarding/routes.types'
import {useOnboardingStore} from '@/modules/onboarding/store/useOnboardingStore'
import {useBanner} from '@/shared/hooks/useBanner'
import {useNavigation} from '@/shared/hooks/useNavigation'

/**
 * OnboardingBanner
 * Manages the display of a sticky banner prompting users to complete onboarding.
 * Uses the useBanner hook to show/hide the banner based on onboarding state.
 * Only shows if onboarding is incomplete and not dismissed.
 * Navigates to the onboarding flow when the CTA is pressed.
 *
 * @returns {React.JSX.Element | null} Returns null (banner is managed via context)
 */
export const OnboardingBanner = (): React.JSX.Element | null => {
  const navigation = useNavigation()
  const {completed, dismissed, dismissBanner} = useOnboardingStore()
  const {showBanner, hideBanner} = useBanner()

  /**
   * handleCtaPress
   * Navigates to the onboarding flow screen
   */
  const handleCtaPress = useCallback((): void => {
    navigation.navigate(OnboardingRouteName.flow)
  }, [navigation])

  /**
   * handleDismiss
   * Dismisses the banner temporarily
   */
  const handleDismiss = useCallback((): void => {
    dismissBanner()
    hideBanner()
  }, [dismissBanner, hideBanner])

  useEffect(() => {
    // Show banner if onboarding is not completed and not dismissed
    if (!completed && !dismissed) {
      showBanner({
        title: 'Complete your profile',
        message: 'Answer a few questions to personalize your experience',
        ctaLabel: 'Get Started',
        onCtaPress: handleCtaPress,
        onDismiss: handleDismiss,
        variant: 'info',
      })
    } else {
      // Hide banner if conditions no longer met
      hideBanner()
    }
  }, [
    completed,
    dismissed,
    showBanner,
    hideBanner,
    handleCtaPress,
    handleDismiss,
  ])

  return null
}
