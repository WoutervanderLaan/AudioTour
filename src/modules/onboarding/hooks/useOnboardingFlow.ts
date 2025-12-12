import {useCallback, useState} from 'react'

import type z from 'zod'

import {ONBOARDING_STEPS} from '../config/steps'
import {useOnboardingStore} from '../store/useOnboardingStore'
import type {OnboardingAnswers, OnboardingStep} from '../types'
import {createStepSchema, type StepFormData} from '../utils/createStepSchema'

import {useNavigation} from '@/shared/hooks/useNavigation'

/**
 * UseOnboardingFlowReturn
 * TODO: describe what this type represents.
 */
type UseOnboardingFlowReturn = {
  /**
   * currentStep
   */
  currentStep: OnboardingStep
  /**
   * currentStepIndex
   */
  currentStepIndex: number
  /**
   * isLastStep
   */
  isLastStep: boolean
  /**
   * isFirstStep
   */
  isFirstStep: boolean
  /**
   * answers
   */
  answers: OnboardingAnswers
  /**
   * stepSchema
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
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
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
