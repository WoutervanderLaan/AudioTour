import type React from 'react'
import type {StyleProp, ViewProps, ViewStyle} from 'react-native'

import type {TestProps} from '@/shared/types/TestProps'
import type {Theme} from '@/themes/types'

/**
 * BoxProps
 * Props for the Box component including layout, alignment, spacing, and padding options.
 */
export type BoxProps = Omit<ViewProps, 'testID'> &
  TestProps<'Box' | 'Container'> & {
    /**
     * Child elements to render inside the Box container
     */
    children?: React.ReactNode
    /**
     * Additional styles to apply to the Box component
     */
    style?: StyleProp<ViewStyle>
    /**
     * Flex grow value for flexible sizing (0 = fixed size, 1 = grow to fill space)
     */
    flex?: number
    /**
     * When true, arranges children horizontally in a row (sets flexDirection: 'row')
     */
    row?: boolean
    /**
     * When true, arranges children vertically in a column (sets flexDirection: 'column')
     */
    column?: boolean
    /**
     * When true, centers children both horizontally and vertically
     */
    center?: boolean
    /**
     * When true, centers children horizontally (sets alignItems: 'center')
     */
    centerX?: boolean
    /**
     * When true, centers children vertically (sets justifyContent: 'center')
     */
    centerY?: boolean
    /**
     * Controls how children are distributed along the main axis
     */
    justifyContent?: ViewStyle['justifyContent']
    /**
     *
     */
    alignItems?: ViewStyle['alignItems']
    /**
     * Spacing between child elements using theme size tokens
     */
    gap?: keyof Theme['size']
    /**
     * Uniform padding on all sides using theme size tokens
     */
    padding?: keyof Theme['size']
    /**
     * Horizontal padding (left and right) using theme size tokens
     */
    paddingH?: keyof Theme['size']
    /**
     * Vertical padding (top and bottom) using theme size tokens
     */
    paddingV?: keyof Theme['size']
    /**
     * Top padding using theme size tokens
     */
    paddingTop?: keyof Theme['size']
    /**
     * Right padding using theme size tokens
     */
    paddingRight?: keyof Theme['size']
    /**
     * Bottom padding using theme size tokens
     */
    paddingBottom?: keyof Theme['size']
    /**
     * Left padding using theme size tokens
     */
    paddingLeft?: keyof Theme['size']
    /**
     * When true, stretches the Box to fill available width (sets alignSelf: 'stretch')
     */
    stretch?: boolean
    /**
     * wrap
     */
    wrap?: ViewStyle['flexWrap']
  }
