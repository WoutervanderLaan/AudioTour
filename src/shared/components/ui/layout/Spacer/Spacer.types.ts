import type {TestProps} from '@/shared/types/TestProps'
import type {Theme} from '@/themes/types'

/**
 * SpacerProps
 * Props for the Spacer component
 */
export type SpacerProps = TestProps<'Spacer'> & {
  /** Optional padding size from theme */
  size?: keyof Theme['size']
}
