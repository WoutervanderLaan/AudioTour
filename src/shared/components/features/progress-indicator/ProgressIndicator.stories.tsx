import type {Meta} from '@storybook/react-native-web-vite'

import {ProgressIndicator} from './ProgressIndicator'

import {Column} from '@/shared/components/ui/layout/Column'

const meta = {
  title: 'Features/ProgressIndicator',
  component: ProgressIndicator,
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressIndicator>

export default meta

/**
 * AllSteps
 * Renders all five steps of a progress indicator to demonstrate different progress states
 * from step 1 through step 5 of a 5-step process.
 *
 * @returns Demo component showing all progress states
 */
const AllSteps = () => (
  <Column
    testID="StoryProgressContainer"
    gap="md">
    <ProgressIndicator
      testID="StoryStep1ProgressIndicator"
      currentStep={1}
      totalSteps={5}
    />
    <ProgressIndicator
      testID="StoryStep2ProgressIndicator"
      currentStep={2}
      totalSteps={5}
    />
    <ProgressIndicator
      testID="StoryStep3ProgressIndicator"
      currentStep={3}
      totalSteps={5}
    />
    <ProgressIndicator
      testID="StoryStep4ProgressIndicator"
      currentStep={4}
      totalSteps={5}
    />
    <ProgressIndicator
      testID="StoryStep5ProgressIndicator"
      currentStep={5}
      totalSteps={5}
    />
  </Column>
)

export const Default = {
  render: AllSteps,
}
