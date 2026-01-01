import type React from 'react'
import type {TextProps} from 'react-native'

import type {TestProps} from '@/shared/types/TestProps'
import type {Theme} from '@/themes/types'

/**
 * TextPropsBase
 * Base props for the TextBase component with theme integration
 */
export type TextPropsBase = Omit<TextProps, 'testID'> &
  TestProps<'Text'> & {
    /**
     * children - Text content to display
     */
    children?: React.ReactNode
    /**
     * color - Text color from theme
     */
    color?: keyof Theme['color']['text']
    /**
     * fontSize - Font size from theme
     */
    fontSize?: keyof Theme['text']['fontSize']
    /**
     * fontFamily - Font family from theme
     */
    fontFamily?: keyof Theme['text']['fontFamily']
    /**
     * align - Text alignment
     */
    align?: 'left' | 'center' | 'right' | 'justify'
    /**
     * lineHeight - Line height from theme
     */
    lineHeight?: keyof Theme['text']['lineHeight']
  }
