import type {PressableBaseProps} from '../PressableBase/PressableBase.types'

import type {TestProps} from '@/shared/types/TestProps'

/**
 * ButtonVariant
 * Visual variants for the Button component
 */
export type ButtonVariant = 'primary' | 'secondary'

/**
 * ButtonProps
 * Props for the Button component
 */
export type ButtonProps = Omit<
  PressableBaseProps,
  'style' | 'children' | 'testID'
> &
  TestProps<'Button'> & {
    /**
     * variant - Button visual variant
     */
    variant?: ButtonVariant
    /**
     * label - Text content of Button
     */
    label: string
  }
