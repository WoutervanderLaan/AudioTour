import type {TestProps} from '@/shared/types/TestProps'

/**
 * ProgressIndicatorProps
 * Props for the ProgressIndicator component.
 * Defines the total number of steps and which step is currently active.
 */
export type ProgressIndicatorProps = TestProps<'ProgressIndicator'> & {
  /**
   * Total number of steps in the process
   */
  totalSteps: number
  /**
   * The current active step (1-based index)
   */
  currentStep: number
}
