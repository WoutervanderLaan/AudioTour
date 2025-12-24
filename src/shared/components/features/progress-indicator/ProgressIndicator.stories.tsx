import type {Meta} from '@storybook/react-native-web-vite'

import {ProgressIndicator} from './ProgressIndicator'
import {Column} from '../../ui/layout/Column'

const meta = {
  title: 'Features/ProgressIndicator',
  component: ProgressIndicator,
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressIndicator>

export default meta

const AllSteps = () => (
  <Column
    testId="StoryProgressContainerView"
    gap="md">
    <ProgressIndicator
      testId="StoryStep1ProgressIndicator"
      currentStep={1}
      totalSteps={5}
    />
    <ProgressIndicator
      testId="StoryStep2ProgressIndicator"
      currentStep={2}
      totalSteps={5}
    />
    <ProgressIndicator
      testId="StoryStep3ProgressIndicator"
      currentStep={3}
      totalSteps={5}
    />
    <ProgressIndicator
      testId="StoryStep4ProgressIndicator"
      currentStep={4}
      totalSteps={5}
    />
    <ProgressIndicator
      testId="StoryStep5ProgressIndicator"
      currentStep={5}
      totalSteps={5}
    />
  </Column>
)

export const Default = {
  render: AllSteps,
}
