import {useCallback, useState} from 'react'

import type z from 'zod'

import {ONBOARDING_STEPS} from '../config/steps'
import {useOnboardingStore} from '../store/useOnboardingStore'
import type {OnboardingAnswers, OnboardingStep} from '../types'
import {createStepSchema, type StepFormData} from '../utils/createStepSchema'

import {useNavigation} from '@/shared/hooks/useNavigation'

/**
 * UseOnboardingFlowReturn
 * Return type for the useOnboardingFlow hook containing the current onboarding state,
 * step navigation handlers, and form validation schema.
 */
type UseOnboardingFlowReturn = {
  /**
   * The current onboarding step configuration
   */
  currentStep: OnboardingStep
  /**
   * Zero-based index of the current step in the onboarding flow
   */
  currentStepIndex: number
  /**
   * Whether the current step is the last step in the flow
   */
  isLastStep: boolean
  /**
   * Whether the current step is the first step in the flow
   */
  isFirstStep: boolean
  /**
   * Record of all user answers keyed by question ID
   */
  answers: OnboardingAnswers
  /**
   * Zod validation schema for the current step's form
   */
  stepSchema: z.ZodObject<
    {
      [key: string]: z.ZodTypeAny
    },
    z.UnknownKeysParam,
    z.ZodTypeAny,
    StepFormData
  >
  /**
   * handleNext
   * Handles moving to the next step and saving the answer
   *
   * @param {StepFormData} data - Form data for the current step
   */
  handleNext: (data: StepFormData) => void
  /**
   * handleBack
   * Handles moving to the previous step
   */
  handleBack: () => void
  /**
   * handleSkip
   * Handles skipping the onboarding flow
   */
  handleSkip: () => void
}

/**
 * useOnboardingFlow
 * Hook that manages the multi-step onboarding flow state and navigation.
 * Provides step-by-step navigation, answer persistence, and form validation
 * for the user preference collection process.
 *
 * @returns {UseOnboardingFlowReturn} Object containing current step state, navigation handlers, and validation schema
 */
export const useOnboardingFlow = (): UseOnboardingFlowReturn => {
  const navigation = useNavigation()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const {answers, setAnswer, completeOnboarding} = useOnboardingStore()

  const currentStep = ONBOARDING_STEPS[currentStepIndex]
  const isLastStep = currentStepIndex === ONBOARDING_STEPS.length - 1
  const isFirstStep = currentStepIndex === 0

  const stepSchema = createStepSchema(currentStepIndex)

  const handleNext = useCallback(
    (data: StepFormData): void => {
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
    },
    [currentStep.id, isLastStep, setAnswer, completeOnboarding, navigation],
  )

  const handleBack = useCallback((): void => {
    if (isFirstStep) {
      navigation.goBack()
    } else {
      setCurrentStepIndex(prev => prev - 1)
    }
  }, [isFirstStep, navigation])

  const handleSkip = useCallback((): void => {
    navigation.goBack()
  }, [navigation])

  return {
    currentStep,
    currentStepIndex,
    isLastStep,
    isFirstStep,
    answers,
    stepSchema,
    handleNext,
    handleBack,
    handleSkip,
  }
}
