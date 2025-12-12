import {OnboardingRouteName, type OnboardingStackParams, type OnboardingModalParams} from './routes.types'
import {OnboardingFlowScreen} from './screens/OnboardingFlowScreen'

import {type StackNavigationRoutes} from '@/core/navigation/types'

export const onboardingStacks: StackNavigationRoutes<OnboardingStackParams, OnboardingRouteName> = {
  [OnboardingRouteName.flow]: {
    component: OnboardingFlowScreen,
    name: OnboardingRouteName.flow,
    options: {
      headerShown: true,
      headerTitle: 'Welcome',
    },
  },
}

export const onboardingModals: StackNavigationRoutes<OnboardingModalParams> = {}
