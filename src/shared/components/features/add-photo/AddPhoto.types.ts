import type {PressableBaseProps} from '@/shared/components/ui/pressable/PressableBase'
import type {TestProps} from '@/shared/types/TestProps'

/**
 * AddPhotoProps
 * Props for the AddPhoto component.
 * Extends PressableBaseProps with size options, excluding style prop.
 */
export type AddPhotoProps = {
  /**
   * Size variant for the add photo button (default: 'md')
   */
  size?: 'sm' | 'md' | 'lg'
} & Omit<PressableBaseProps, 'style' | 'testID'> &
  TestProps<'AddPhoto'>
