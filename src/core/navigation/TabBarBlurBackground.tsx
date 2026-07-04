import type React from 'react'

import {BlurBackground} from './BlurBackground'

/**
 * TabBarBlurBackground
 * Blur background component for tab bars with top edge feathered.
 * Used as the tabBarBackground prop in React Navigation bottom tab navigators.
 *
 * @returns BlurBackground component with feathered top edge
 */
export const TabBarBlurBackground = (): React.JSX.Element => {
  return <BlurBackground featherEdge="top" />
}
