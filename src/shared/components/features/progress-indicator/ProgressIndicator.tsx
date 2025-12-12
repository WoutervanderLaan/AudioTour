import type React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {Text} from '@/shared/components/ui/typography'

/**
 * ProgressIndicatorProps
 * TODO: describe what this type represents.
 */
type ProgressIndicatorProps = {
  /**
   * totalSteps
   */
  totalSteps: number
  /**
   * currentStep
   */
  currentStep: number
}
/**
 * ProgressIndicator
 * TODO: describe what it does.
 *
 * @param {*} options
 * @returns {*} describe return value
 */
export const ProgressIndicator = ({
  totalSteps,
  currentStep,
}: ProgressIndicatorProps): React.JSX.Element => {
  const progress = ((currentStep - 1) / totalSteps) * 100

  return (
    <Column gap="xs">
      <Row
        centerY
        gap="sm">
        <Text.Label color="secondary">
          Step {currentStep} of {totalSteps}
        </Text.Label>
      </Row>
      <Column style={styles.progressBar}>
        <Column style={[styles.progressFill, {width: `${progress}%`}]} />
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
