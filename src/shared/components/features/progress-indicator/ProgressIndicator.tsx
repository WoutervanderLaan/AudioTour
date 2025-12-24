import type React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {Text} from '@/shared/components/ui/typography'
import type {TestProps} from '@/shared/types/test'

/**
 * ProgressIndicatorProps
 * Props for the ProgressIndicator component.
 * Defines the total number of steps and which step is currently active.
 */
type ProgressIndicatorProps = TestProps<'ProgressIndicator'> & {
  /**
   * Total number of steps in the process
   */
  totalSteps: number
  /**
   * The current active step (1-based index)
   */
  currentStep: number
}
/**
 * ProgressIndicator
 * Displays a progress bar showing completion status through multiple steps.
 * Shows both a text label ("Step X of Y") and a visual progress bar.
 * Progress is calculated as (currentStep - 1) / totalSteps * 100%.
 *
 * @param props - Component props containing step information
 * @returns Progress indicator component with label and bar
 */
export const ProgressIndicator = ({
  totalSteps,
  currentStep,
  testId,
}: ProgressIndicatorProps): React.JSX.Element => {
  const progress = (currentStep / totalSteps) * 100

  return (
    <Column
      testId={`${testId}View` as `${string}View`}
      gap="xs">
      <Row
        testId={`${testId}StepView` as `${string}View`}
        centerY
        gap="sm">
        <Text.Label
          testId={`${testId}StepText` as `${string}Text`}
          color="secondary">
          Step {currentStep} of {totalSteps}
        </Text.Label>
      </Row>
      <Column
        testId={`${testId}ProgressBarView` as `${string}View`}
        style={styles.progressBar}>
        <Column
          testId={`${testId}ProgressFillView` as `${string}View`}
          style={[styles.progressFill, {width: `${progress}%`}]}
        />
      </Column>
    </Column>
  )
}

const styles = StyleSheet.create(theme => ({
  progressBar: {
    height: 4,
    backgroundColor: theme.color.textInput.container.background,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.color.pressable.primary.default.background,
  },
}))
