import {renderHook, act} from '@testing-library/react'

import {useOnboardingStore} from './useOnboardingStore'
import {
  useOnboardingAnswers,
  useOnboardingCompleted,
  useOnboardingDismissed,
  useOnboardingActions,
} from './selectors'

describe('onboarding selectors', () => {
  beforeEach(() => {
    // Reset store
    useOnboardingStore.getState().reset()
  })

  describe('useOnboardingAnswers', () => {
    it('should return empty object initially', () => {
      const {result} = renderHook(() => useOnboardingAnswers())

      expect(result.current).toEqual({})
    })

    it('should return answers when set', () => {
      act(() => {
        useOnboardingStore.getState().setAnswer('question1', 'answer1')
      })

      const {result} = renderHook(() => useOnboardingAnswers())

      expect(result.current).toEqual({question1: 'answer1'})
    })

    it('should update when answers change', () => {
      const {result} = renderHook(() => useOnboardingAnswers())

      act(() => {
        useOnboardingStore.getState().setAnswer('q1', 'a1')
      })
      expect(result.current).toEqual({q1: 'a1'})

      act(() => {
        useOnboardingStore.getState().setAnswer('q2', true)
      })
      expect(result.current).toEqual({q1: 'a1', q2: true})
    })

    it('should handle multiple answer types', () => {
      act(() => {
        useOnboardingStore.getState().setAnswer('stringAnswer', 'text')
        useOnboardingStore.getState().setAnswer('booleanAnswer', true)
      })

      const {result} = renderHook(() => useOnboardingAnswers())

      expect(result.current).toEqual({
        stringAnswer: 'text',
        booleanAnswer: true,
      })
    })

    it('should return empty after reset', () => {
      act(() => {
        useOnboardingStore.getState().setAnswer('q1', 'a1')
      })

      const {result} = renderHook(() => useOnboardingAnswers())
      expect(result.current).toEqual({q1: 'a1'})

      act(() => {
        useOnboardingStore.getState().reset()
      })
      expect(result.current).toEqual({})
    })
  })

  describe('useOnboardingCompleted', () => {
    it('should return false initially', () => {
      const {result} = renderHook(() => useOnboardingCompleted())

      expect(result.current).toBe(false)
    })

    it('should return true when completed', () => {
      act(() => {
        useOnboardingStore.getState().completeOnboarding()
      })

      const {result} = renderHook(() => useOnboardingCompleted())

      expect(result.current).toBe(true)
    })

    it('should update when completion state changes', () => {
      const {result} = renderHook(() => useOnboardingCompleted())

      act(() => {
        useOnboardingStore.getState().completeOnboarding()
      })
      expect(result.current).toBe(true)

      act(() => {
        useOnboardingStore.getState().reset()
      })
      expect(result.current).toBe(false)
    })
  })

  describe('useOnboardingDismissed', () => {
    it('should return false initially', () => {
      const {result} = renderHook(() => useOnboardingDismissed())

      expect(result.current).toBe(false)
    })

    it('should return true when dismissed', () => {
      act(() => {
        useOnboardingStore.getState().dismissBanner()
      })

      const {result} = renderHook(() => useOnboardingDismissed())

      expect(result.current).toBe(true)
    })

    it('should return false after completing onboarding', () => {
      act(() => {
        useOnboardingStore.getState().dismissBanner()
      })

      const {result} = renderHook(() => useOnboardingDismissed())
      expect(result.current).toBe(true)

      act(() => {
        useOnboardingStore.getState().completeOnboarding()
      })
      expect(result.current).toBe(false)
    })
  })

  describe('useOnboardingActions', () => {
    it('should return all action methods', () => {
      const {result} = renderHook(() => useOnboardingActions())

      expect(result.current).toHaveProperty('setAnswer')
      expect(result.current).toHaveProperty('completeOnboarding')
      expect(result.current).toHaveProperty('dismissBanner')
      expect(result.current).toHaveProperty('reset')
      expect(typeof result.current.setAnswer).toBe('function')
      expect(typeof result.current.completeOnboarding).toBe('function')
      expect(typeof result.current.dismissBanner).toBe('function')
      expect(typeof result.current.reset).toBe('function')
    })

    it('should set answer via action', () => {
      const {result} = renderHook(() => useOnboardingActions())

      act(() => {
        result.current.setAnswer('experience', 'beginner')
      })

      expect(useOnboardingStore.getState().answers).toEqual({
        experience: 'beginner',
      })
    })

    it('should set boolean answer via action', () => {
      const {result} = renderHook(() => useOnboardingActions())

      act(() => {
        result.current.setAnswer('accessibility', true)
      })

      expect(useOnboardingStore.getState().answers.accessibility).toBe(true)
    })

    it('should complete onboarding via action', () => {
      const {result} = renderHook(() => useOnboardingActions())

      act(() => {
        result.current.completeOnboarding()
      })

      const state = useOnboardingStore.getState()
      expect(state.completed).toBe(true)
      expect(state.dismissed).toBe(false)
    })

    it('should dismiss banner via action', () => {
      const {result} = renderHook(() => useOnboardingActions())

      act(() => {
        result.current.dismissBanner()
      })

      expect(useOnboardingStore.getState().dismissed).toBe(true)
    })

    it('should reset via action', () => {
      const {result} = renderHook(() => useOnboardingActions())

      act(() => {
        result.current.setAnswer('q1', 'a1')
        result.current.completeOnboarding()
        result.current.dismissBanner()
      })

      act(() => {
        result.current.reset()
      })

      const state = useOnboardingStore.getState()
      expect(state.answers).toEqual({})
      expect(state.completed).toBe(false)
      expect(state.dismissed).toBe(false)
    })

    it('should maintain stable reference', () => {
      const {result, rerender} = renderHook(() => useOnboardingActions())

      const firstReference = result.current

      rerender()

      expect(result.current).toBe(firstReference)
    })
  })

  describe('integration tests', () => {
    it('should work together across selectors', () => {
      const {result: answersResult} = renderHook(() => useOnboardingAnswers())
      const {result: completedResult} = renderHook(() => useOnboardingCompleted())
      const {result: dismissedResult} = renderHook(() => useOnboardingDismissed())
      const {result: actionsResult} = renderHook(() => useOnboardingActions())

      // Initial state
      expect(answersResult.current).toEqual({})
      expect(completedResult.current).toBe(false)
      expect(dismissedResult.current).toBe(false)

      // Fill out answers
      act(() => {
        actionsResult.current.setAnswer('experience_level', 'beginner')
        actionsResult.current.setAnswer('preferred_style', 'storytelling')
        actionsResult.current.setAnswer('interests', 'art')
        actionsResult.current.setAnswer('tour_length', 'medium')
        actionsResult.current.setAnswer('accessibility', true)
      })

      expect(answersResult.current).toEqual({
        experience_level: 'beginner',
        preferred_style: 'storytelling',
        interests: 'art',
        tour_length: 'medium',
        accessibility: true,
      })

      // Complete onboarding
      act(() => {
        actionsResult.current.completeOnboarding()
      })

      expect(completedResult.current).toBe(true)
      expect(dismissedResult.current).toBe(false)

      // Reset
      act(() => {
        actionsResult.current.reset()
      })

      expect(answersResult.current).toEqual({})
      expect(completedResult.current).toBe(false)
      expect(dismissedResult.current).toBe(false)
    })

    it('should handle dismiss then complete flow', () => {
      const {result: completedResult} = renderHook(() => useOnboardingCompleted())
      const {result: dismissedResult} = renderHook(() => useOnboardingDismissed())
      const {result: actionsResult} = renderHook(() => useOnboardingActions())

      // Dismiss banner
      act(() => {
        actionsResult.current.dismissBanner()
      })

      expect(dismissedResult.current).toBe(true)
      expect(completedResult.current).toBe(false)

      // Complete onboarding (should reset dismissed)
      act(() => {
        actionsResult.current.completeOnboarding()
      })

      expect(completedResult.current).toBe(true)
      expect(dismissedResult.current).toBe(false)
    })

    it('should maintain answers through completion flow', () => {
      const {result: answersResult} = renderHook(() => useOnboardingAnswers())
      const {result: actionsResult} = renderHook(() => useOnboardingActions())

      act(() => {
        actionsResult.current.setAnswer('q1', 'a1')
        actionsResult.current.setAnswer('q2', 'a2')
      })

      const answersBeforeComplete = {...answersResult.current}

      act(() => {
        actionsResult.current.completeOnboarding()
      })

      expect(answersResult.current).toEqual(answersBeforeComplete)
    })
  })
})
