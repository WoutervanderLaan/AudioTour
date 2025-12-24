import type React from 'react'
import {useEffect} from 'react'

import {OnboardingRouteName} from '@/modules/onboarding/routes.types'
import {useOnboardingStore} from '@/modules/onboarding/store/useOnboardingStore'
import {useBanner} from '@/shared/hooks/useBanner'
import {useNavigation} from '@/shared/hooks/useNavigation'

/**
 * OnboardingBannerProps
 * Props for the OnboardingBanner component
 */
type OnboardingBannerProps = {
  /**
   * Test ID for the banner
   */
  testID?: string
}

/**
 * OnboardingBanner
 * Manages the display of a sticky banner prompting users to complete onboarding.
 * Uses the useBanner hook to show/hide the banner based on onboarding state.
 * Only shows if onboarding is incomplete and not dismissed.
 * Navigates to the onboarding flow when the CTA is pressed.
 *
 * @param {OnboardingBannerProps} props - Component props
 * @returns {React.JSX.Element | null} Returns null (banner is managed via context)
 */
export const OnboardingBanner = ({
  testID = 'OnboardingBannerStickyBanner',
}: OnboardingBannerProps): React.JSX.Element | null => {
  const navigation = useNavigation()
  const {completed, dismissed, dismissBanner} = useOnboardingStore()
  const {showBanner, hideBanner} = useBanner()

  useEffect(() => {
    // Show banner if onboarding is not completed and not dismissed
    if (!completed && !dismissed) {
      showBanner({
        title: 'Complete your profile',
        message: 'Answer a few questions to personalize your experience',
        ctaLabel: 'Get Started',
        onCtaPress: () => {
          navigation.navigate(OnboardingRouteName.flow)
        },
        onDismiss: () => {
          dismissBanner()
          hideBanner()
        },
        variant: 'info',
        testID: testID as `${string}StickyBanner`,
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
    navigation,
    dismissBanner,
    testID,
  ])

  return null
}
