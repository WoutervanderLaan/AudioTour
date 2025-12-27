/* eslint-disable max-lines-per-function */
import type React from 'react'
import {useEffect} from 'react'
import {useForm} from 'react-hook-form'

import {zodResolver} from '@hookform/resolvers/zod'

import {ONBOARDING_STEPS} from '../config/steps'
import {useOnboardingFlow} from '../hooks/useOnboardingFlow'
import {OnboardingStepType} from '../types'
import type {StepFormData} from '../utils/createStepSchema'

import {ProgressIndicator} from '@/shared/components/features/progress-indicator/ProgressIndicator'
import {RadioGroupControlled} from '@/shared/components/ui/form/RadioGroupControlled'
import {SwitchControlled} from '@/shared/components/ui/form/SwitchControlled'
import {TextInputControlled} from '@/shared/components/ui/form/TextInputControlled'
import {Column} from '@/shared/components/ui/layout/Column'
import {Spacer} from '@/shared/components/ui/layout/Spacer'
import {Button} from '@/shared/components/ui/pressable/Button'
import {Screen} from '@/shared/components/ui/screen/Screen'
import {Text} from '@/shared/components/ui/typography/Text'

/**
 * OnboardingFlowScreen
 * Multi-step onboarding flow screen that guides users through
 * configuration questions. Each question is displayed on a separate
 * screen with navigation controls.
 *
 * @returns {React.JSX.Element} The onboarding flow screen
 */
export const OnboardingFlowScreen = (): React.JSX.Element => {
  const {
    currentStep,
    answers,
    currentStepIndex,
    isLastStep,
    handleNext,
    handleBack,
    handleSkip,
    stepSchema,
  } = useOnboardingFlow()

  const {control, handleSubmit, formState, reset} = useForm<StepFormData>({
    resolver: zodResolver(stepSchema),
    defaultValues: {
      [currentStep.id]:
        answers[currentStep.id] ??
        (currentStep.type === OnboardingStepType.TOGGLE ? false : ''),
    },
  })

  /**
   * Reset form values when step changes to preserve user's previous answers
   */
  useEffect(() => {
    const previousAnswer = answers[currentStep.id]
    const defaultValue =
      previousAnswer ??
      (currentStep.type === OnboardingStepType.TOGGLE ? false : '')

    reset({
      [currentStep.id]: defaultValue,
    })
  }, [currentStepIndex, currentStep.id, currentStep.type, answers, reset])

  /**
   * renderStepInput
   * Renders the appropriate input component based on step type
   *
   * @returns {React.JSX.Element} The input component for the current step
   */
  const renderStepInput = (): React.JSX.Element | null => {
    switch (currentStep.type) {
      case OnboardingStepType.RADIO:
        return (
          <RadioGroupControlled
            control={control}
            name={currentStep.id}
            options={currentStep.options || []}
            required={currentStep.required}
            testID="OnboardingFlowScreenStepRadioGroup"
          />
        )
      case OnboardingStepType.TOGGLE:
        return (
          <SwitchControlled
            control={control}
            name={currentStep.id}
            label={currentStep.label ?? 'Enable this option'}
            hint={currentStep.hint}
            testID="OnboardingFlowScreenStepSwitch"
          />
        )
      case OnboardingStepType.TEXT:
        return (
          <TextInputControlled
            control={control}
            name={currentStep.id}
            placeholder={currentStep.placeholder}
            required={currentStep.required}
            testID="OnboardingFlowScreenStepTextInput"
          />
        )
      default:
        return null
    }
  }

  return (
    <Screen.Scrollable
      keyboardAvoiding
      testID="OnboardingFlowScreen">
      <Column
        flex={1}
        padding="md"
        paddingBottom="xl"
        gap="lg"
        testID="OnboardingFlowScreenContainerColumn">
        <ProgressIndicator
          currentStep={currentStepIndex + 1}
          totalSteps={ONBOARDING_STEPS.length}
          testID="OnboardingFlowScreenProgressIndicator"
        />

        <Column
          flex={1}
          gap="md"
          testID="OnboardingFlowScreenContentColumn">
          <Column
            gap="sm"
            testID="OnboardingFlowScreenHeaderColumn">
            <Text.Title testID="OnboardingFlowScreenTitleText">
              {currentStep.title}
            </Text.Title>
            <Text.Paragraph
              color="secondary"
              testID="OnboardingFlowScreenDescriptionText">
              {currentStep.description}
            </Text.Paragraph>
          </Column>

          {renderStepInput()}
        </Column>

        <Column
          gap="sm"
          testID="OnboardingFlowScreenActionsColumn">
          <Button
            label={isLastStep ? 'Complete' : 'Next'}
            onPress={handleSubmit(handleNext)}
            disabled={formState.isSubmitting}
            testID="OnboardingFlowScreenNextButton"
          />
          <Button
            label="Back"
            variant="secondary"
            onPress={handleBack}
            testID="OnboardingFlowScreenBackButton"
          />
          <Spacer
            size="sm"
            testID="OnboardingFlowScreenSpacerSpacer"
          />
          <Button
            label="Skip"
            onPress={handleSkip}
            disabled={formState.isSubmitting || isLastStep}
            testID="OnboardingFlowScreenSkipButton"
          />
        </Column>
      </Column>
    </Screen.Scrollable>
  )
}
