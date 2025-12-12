import type React from 'react'
import {useCallback, useState} from 'react'
import {useForm} from 'react-hook-form'
import {StyleSheet} from 'react-native-unistyles'

import {zodResolver} from '@hookform/resolvers/zod'
import {useNavigation} from '@react-navigation/native'
import {z} from 'zod'

import {ONBOARDING_STEPS} from '../config/steps'
import {useOnboardingStore} from '../store/useOnboardingStore'
import {OnboardingStepType} from '../types'

import {
  RadioGroupControlled,
  SwitchControlled,
  TextInputControlled,
} from '@/shared/components/ui/form'
import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {Button, LinkButton} from '@/shared/components/ui/pressable'
import {Screen} from '@/shared/components/ui/screen'
import {Text} from '@/shared/components/ui/typography'

/**
 * createStepSchema
 * Creates a Zod schema for the current step based on its configuration
 *
 * @param {number} stepIndex - Index of the current step
 * @returns {z.ZodObject} Zod schema for the step
 */
const createStepSchema = (stepIndex: number): z.ZodObject<{[key: string]: z.ZodTypeAny}> => {
  const step = ONBOARDING_STEPS[stepIndex]

  if (!step) {
    return z.object({})
  }

  let fieldSchema: z.ZodTypeAny

  switch (step.type) {
    case OnboardingStepType.RADIO:
      if (step.required) {
        fieldSchema = z.string({required_error: 'Please select an option'})
      } else {
        fieldSchema = z.string().optional()
      }
      break
    case OnboardingStepType.TOGGLE:
      fieldSchema = z.boolean().optional()
      break
    case OnboardingStepType.TEXT:
      if (step.required) {
        fieldSchema = z.string().min(1, 'This field is required')
      } else {
        fieldSchema = z.string().optional()
      }
      break
    default:
      fieldSchema = z.string().optional()
  }

  return z.object({
    [step.id]: fieldSchema,
  })
}

/**
 * OnboardingFlowScreen
 * Multi-step onboarding flow screen that guides users through
 * configuration questions. Each question is displayed on a separate
 * screen with navigation controls.
 *
 * @returns {React.JSX.Element} The onboarding flow screen
 */
export const OnboardingFlowScreen = (): React.JSX.Element => {
  const navigation = useNavigation()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const {answers, setAnswer, completeOnboarding} = useOnboardingStore()

  const currentStep = ONBOARDING_STEPS[currentStepIndex]
  const isLastStep = currentStepIndex === ONBOARDING_STEPS.length - 1
  const isFirstStep = currentStepIndex === 0

  const stepSchema = createStepSchema(currentStepIndex)
  type StepFormData = z.infer<typeof stepSchema>

  const {control, handleSubmit, formState} = useForm<StepFormData>({
    resolver: zodResolver(stepSchema),
    defaultValues: {
      [currentStep.id]: answers[currentStep.id] ?? (currentStep.type === OnboardingStepType.TOGGLE ? false : ''),
    } as StepFormData,
  })

  /**
   * handleNext
   * Handles moving to the next step and saving the answer
   *
   * @param {StepFormData} data - Form data for the current step
   */
  const handleNext = useCallback((data: StepFormData): void => {
    const answer = data[currentStep.id]
    if (answer !== undefined) {
      setAnswer(currentStep.id, answer as string | boolean)
    }

    if (isLastStep) {
      completeOnboarding()
      navigation.goBack()
    } else {
      setCurrentStepIndex(prev => prev + 1)
    }
  }, [currentStep.id, isLastStep, setAnswer, completeOnboarding, navigation])

  /**
   * handleBack
   * Handles moving to the previous step
   */
  const handleBack = useCallback((): void => {
    if (isFirstStep) {
      navigation.goBack()
    } else {
      setCurrentStepIndex(prev => prev - 1)
    }
  }, [isFirstStep, navigation])

  /**
   * handleSkip
   * Handles skipping the onboarding flow
   */
  const handleSkip = useCallback((): void => {
    navigation.goBack()
  }, [navigation])

  /**
   * renderStepInput
   * Renders the appropriate input component based on step type
   *
   * @returns {React.JSX.Element} The input component for the current step
   */
  const renderStepInput = (): React.JSX.Element => {
    switch (currentStep.type) {
      case OnboardingStepType.RADIO:
        return (
          <RadioGroupControlled
            control={control}
            name={currentStep.id as keyof StepFormData}
            options={currentStep.options || []}
            required={currentStep.required}
          />
        )
      case OnboardingStepType.TOGGLE:
        return (
          <SwitchControlled
            control={control}
            name={currentStep.id as keyof StepFormData}
            label="Enable accessibility features"
            hint="Larger text, high contrast, and screen reader support"
          />
        )
      case OnboardingStepType.TEXT:
        return (
          <TextInputControlled
            control={control}
            name={currentStep.id as keyof StepFormData}
            placeholder={currentStep.placeholder}
            required={currentStep.required}
          />
        )
      default:
        return <Text.Paragraph>Unknown step type</Text.Paragraph>
    }
  }

  const progress = ((currentStepIndex + 1) / ONBOARDING_STEPS.length) * 100

  return (
    <Screen.Static keyboardAvoiding>
      <Column
        flex={1}
        padding="md"
        gap="lg">
        {/* Progress indicator */}
        <Column gap="xs">
          <Row
            centerY
            gap="sm">
            <Text.Label color="secondary">
              Step {currentStepIndex + 1} of {ONBOARDING_STEPS.length}
            </Text.Label>
            <LinkButton
              label="Skip"
              onPress={handleSkip}
              variant="small"
            />
          </Row>
          <Column style={styles.progressBar}>
            <Column style={[styles.progressFill, {width: `${progress}%`}]} />
          </Column>
        </Column>

        {/* Step content */}
        <Column
          flex={1}
          gap="md">
          <Column gap="sm">
            <Text.Title>{currentStep.title}</Text.Title>
            <Text.Paragraph color="secondary">
              {currentStep.description}
            </Text.Paragraph>
          </Column>

          {renderStepInput()}
        </Column>

        {/* Navigation buttons */}
        <Column gap="sm">
          <Button
            label={isLastStep ? 'Complete' : 'Next'}
            onPress={handleSubmit(handleNext)}
            disabled={formState.isSubmitting}
          />
          <Button
            label="Back"
            variant="secondary"
            onPress={handleBack}
          />
        </Column>
      </Column>
    </Screen.Static>
  )
}

const styles = StyleSheet.create(theme => ({
  progressBar: {
    height: 4,
    backgroundColor: theme.color.textInput.container.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.color.pressable.primary.default.background,
  },
}))
