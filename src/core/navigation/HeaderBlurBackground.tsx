import type React from 'react'

import {BlurBackground} from './BlurBackground'

/**
 * HeaderBlurBackground
 * Blur background component for headers with bottom edge feathered.
 * Used as the headerBackground prop in React Navigation stack navigators.
 *
 * @returns BlurBackground component with feathered bottom edge
 */
export const HeaderBlurBackground = (): React.JSX.Element => {
  return <BlurBackground featherEdge="bottom" />
}
