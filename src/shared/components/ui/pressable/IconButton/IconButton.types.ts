import type {PressableBaseProps} from '../PressableBase/PressableBase.types'

import type {IconName} from '@/core/navigation/types'
import type {TestProps} from '@/shared/types/TestProps'

/**
 * IconButtonSize
 * Size variants for the IconButton component
 */
export type IconButtonSize = 'sm' | 'md' | 'lg'

/**
 * IconButtonProps
 * Props for the IconButton component
 */
export type IconButtonProps = Omit<
  PressableBaseProps,
  'style' | 'children' | 'testID'
> &
  TestProps<'IconButton'> & {
    /**
     * name - The icon name from MaterialIcons
     */
    name: IconName
    /**
     * size - The size variant of the icon button
     */
    size?: IconButtonSize
    /**
     * color - Optional color override for the icon
     */
    color?: string
  }
