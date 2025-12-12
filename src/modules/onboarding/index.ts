import {ModuleSlug} from '../slugs'
import type {ModuleConfig} from '../types'
import {onboardingModals, onboardingStacks} from './screenConfig'

import {logger} from '@/core/lib/logger'
import {useOnboardingStore} from '@/modules/onboarding/store/useOnboardingStore'

/**
 * Onboarding module configuration.
 * Handles user onboarding flow with configuration questions.
 * Includes:
 * - Stack screens: OnboardingFlow
 */
export const onboardingModule: ModuleConfig = {
  name: ModuleSlug.onboarding,
  version: '1.0.0',
  enabled: true,

  stacks: onboardingStacks,
  modals: onboardingModals,

  dependencies: [],

  onRegister: () => {
    logger.debug('Onboarding Module registered')
  },

  onUnregister: () => {
    logger.debug('Onboarding Module unregistered')
    useOnboardingStore.getState().reset()
  },

  onAppStart: () => {
    logger.debug('[Onboarding Module] Initializing...')

    const {completed, answers} = useOnboardingStore.getState()

    if (completed) {
      logger.debug('[Onboarding Module] User has completed onboarding')
    } else {
      logger.debug('[Onboarding Module] User has not completed onboarding')
    }

    logger.debug('[Onboarding Module] Current answers:', answers)
  },
}
