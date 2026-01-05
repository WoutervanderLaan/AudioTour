import type {PressableProps, StyleProp, ViewStyle} from 'react-native'

import type {TestProps} from '@/shared/types/TestProps'

/**
 * PressableBaseProps
 * Base props for the Pressable component with accessibility features
 */
export type PressableBaseProps = Omit<PressableProps, 'style' | 'testID'> &
  TestProps<'Pressable'> & {
    /**
     * children - Content to display inside the pressable
     */
    // children?: React.ReactNode
    style?: (state: {
      pressed: boolean
      disabled?: boolean
    }) => StyleProp<ViewStyle>
  }
