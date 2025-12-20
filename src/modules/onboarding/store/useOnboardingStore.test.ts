import {useOnboardingStore} from './useOnboardingStore'

describe('useOnboardingStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    const {reset} = useOnboardingStore.getState()
    reset()
  })

  describe('initial state', () => {
    it('should have empty answers object', () => {
      const {answers} = useOnboardingStore.getState()
      expect(answers).toEqual({})
    })

    it('should have completed false', () => {
      const {completed} = useOnboardingStore.getState()
      expect(completed).toBe(false)
    })

    it('should have dismissed false', () => {
      const {dismissed} = useOnboardingStore.getState()
      expect(dismissed).toBe(false)
    })
  })

  describe('setAnswer', () => {
    it('should set string answer', () => {
      const {setAnswer} = useOnboardingStore.getState()

      setAnswer('question1', 'answer1')

      const {answers} = useOnboardingStore.getState()
      expect(answers.question1).toBe('answer1')
    })

    it('should set boolean answer', () => {
      const {setAnswer} = useOnboardingStore.getState()

      setAnswer('question1', true)

      const {answers} = useOnboardingStore.getState()
      expect(answers.question1).toBe(true)
    })

    it('should set multiple answers', () => {
      const {setAnswer} = useOnboardingStore.getState()

      setAnswer('question1', 'answer1')
      setAnswer('question2', true)
      setAnswer('question3', 'answer3')

      const {answers} = useOnboardingStore.getState()
      expect(answers).toEqual({
        question1: 'answer1',
        question2: true,
        question3: 'answer3',
      })
    })

    it('should update existing answer', () => {
      const {setAnswer} = useOnboardingStore.getState()

      setAnswer('question1', 'first-answer')
      expect(useOnboardingStore.getState().answers.question1).toBe('first-answer')

      setAnswer('question1', 'second-answer')
      expect(useOnboardingStore.getState().answers.question1).toBe('second-answer')
    })

    it('should not affect other answers when updating one', () => {
      const {setAnswer} = useOnboardingStore.getState()

      setAnswer('question1', 'answer1')
      setAnswer('question2', 'answer2')
      setAnswer('question1', 'updated-answer1')

      const {answers} = useOnboardingStore.getState()
      expect(answers.question1).toBe('updated-answer1')
      expect(answers.question2).toBe('answer2')
    })

    it('should handle empty string answer', () => {
      const {setAnswer} = useOnboardingStore.getState()

      setAnswer('question1', '')

      const {answers} = useOnboardingStore.getState()
      expect(answers.question1).toBe('')
    })

    it('should handle boolean false', () => {
      const {setAnswer} = useOnboardingStore.getState()

      setAnswer('question1', false)

      const {answers} = useOnboardingStore.getState()
      expect(answers.question1).toBe(false)
    })

    it('should handle long text answer', () => {
      const {setAnswer} = useOnboardingStore.getState()
      const longText = 'A'.repeat(1000)

      setAnswer('question1', longText)

      const {answers} = useOnboardingStore.getState()
      expect(answers.question1).toBe(longText)
    })

    it('should handle special characters in question ID', () => {
      const {setAnswer} = useOnboardingStore.getState()

      setAnswer('question-1-a', 'answer')

      const {answers} = useOnboardingStore.getState()
      expect(answers['question-1-a']).toBe('answer')
    })
  })

  describe('completeOnboarding', () => {
    it('should set completed to true', () => {
      const {completeOnboarding} = useOnboardingStore.getState()

      completeOnboarding()

      const {completed} = useOnboardingStore.getState()
      expect(completed).toBe(true)
    })

    it('should set dismissed to false', () => {
      const {dismissBanner, completeOnboarding} = useOnboardingStore.getState()

      dismissBanner()
      expect(useOnboardingStore.getState().dismissed).toBe(true)

      completeOnboarding()

      const {dismissed} = useOnboardingStore.getState()
      expect(dismissed).toBe(false)
    })

    it('should not affect answers', () => {
      const {setAnswer, completeOnboarding} = useOnboardingStore.getState()

      setAnswer('question1', 'answer1')
      setAnswer('question2', true)

      completeOnboarding()

      const {answers} = useOnboardingStore.getState()
      expect(answers).toEqual({
        question1: 'answer1',
        question2: true,
      })
    })

    it('should allow completing multiple times', () => {
      const {completeOnboarding} = useOnboardingStore.getState()

      completeOnboarding()
      completeOnboarding()

      const {completed} = useOnboardingStore.getState()
      expect(completed).toBe(true)
    })
  })

  describe('dismissBanner', () => {
    it('should set dismissed to true', () => {
      const {dismissBanner} = useOnboardingStore.getState()

      dismissBanner()

      const {dismissed} = useOnboardingStore.getState()
      expect(dismissed).toBe(true)
    })

    it('should not affect completed', () => {
      const {dismissBanner} = useOnboardingStore.getState()

      dismissBanner()

      const {completed} = useOnboardingStore.getState()
      expect(completed).toBe(false)
    })

    it('should not affect answers', () => {
      const {setAnswer, dismissBanner} = useOnboardingStore.getState()

      setAnswer('question1', 'answer1')
      dismissBanner()

      const {answers} = useOnboardingStore.getState()
      expect(answers).toEqual({question1: 'answer1'})
    })

    it('should allow dismissing multiple times', () => {
      const {dismissBanner} = useOnboardingStore.getState()

      dismissBanner()
      dismissBanner()

      const {dismissed} = useOnboardingStore.getState()
      expect(dismissed).toBe(true)
    })
  })

  describe('reset', () => {
    it('should reset to initial state', () => {
      const {setAnswer, completeOnboarding, dismissBanner, reset} = useOnboardingStore.getState()

      setAnswer('question1', 'answer1')
      setAnswer('question2', true)
      completeOnboarding()
      dismissBanner()

      reset()

      const {answers, completed, dismissed} = useOnboardingStore.getState()
      expect(answers).toEqual({})
      expect(completed).toBe(false)
      expect(dismissed).toBe(false)
    })

    it('should clear all answers', () => {
      const {setAnswer, reset} = useOnboardingStore.getState()

      setAnswer('q1', 'a1')
      setAnswer('q2', 'a2')
      setAnswer('q3', 'a3')

      reset()

      const {answers} = useOnboardingStore.getState()
      expect(Object.keys(answers)).toHaveLength(0)
    })

    it('should allow setting values after reset', () => {
      const {setAnswer, reset} = useOnboardingStore.getState()

      setAnswer('question1', 'answer1')
      reset()
      setAnswer('question2', 'answer2')

      const {answers} = useOnboardingStore.getState()
      expect(answers).toEqual({question2: 'answer2'})
    })
  })

  describe('edge cases', () => {
    it('should handle complete onboarding flow', () => {
      const {setAnswer, completeOnboarding} = useOnboardingStore.getState()

      setAnswer('experience', 'beginner')
      setAnswer('interests', 'art,history')
      setAnswer('notifications', true)
      completeOnboarding()

      const state = useOnboardingStore.getState()
      expect(state.answers).toEqual({
        experience: 'beginner',
        interests: 'art,history',
        notifications: true,
      })
      expect(state.completed).toBe(true)
      expect(state.dismissed).toBe(false)
    })

    it('should handle dismiss flow', () => {
      const {setAnswer, dismissBanner} = useOnboardingStore.getState()

      setAnswer('question1', 'answer1')
      dismissBanner()

      const state = useOnboardingStore.getState()
      expect(state.answers).toEqual({question1: 'answer1'})
      expect(state.completed).toBe(false)
      expect(state.dismissed).toBe(true)
    })

    it('should handle dismiss then complete flow', () => {
      const {dismissBanner, completeOnboarding} = useOnboardingStore.getState()

      dismissBanner()
      expect(useOnboardingStore.getState().dismissed).toBe(true)

      completeOnboarding()

      const state = useOnboardingStore.getState()
      expect(state.completed).toBe(true)
      expect(state.dismissed).toBe(false)
    })

    it('should handle many answers', () => {
      const {setAnswer} = useOnboardingStore.getState()

      for (let i = 0; i < 20; i++) {
        setAnswer(`question${i}`, `answer${i}`)
      }

      const {answers} = useOnboardingStore.getState()
      expect(Object.keys(answers)).toHaveLength(20)
      expect(answers.question0).toBe('answer0')
      expect(answers.question19).toBe('answer19')
    })

    it('should handle mixed answer types', () => {
      const {setAnswer} = useOnboardingStore.getState()

      setAnswer('stringAnswer', 'text')
      setAnswer('booleanTrue', true)
      setAnswer('booleanFalse', false)
      setAnswer('emptyString', '')

      const {answers} = useOnboardingStore.getState()
      expect(answers.stringAnswer).toBe('text')
      expect(answers.booleanTrue).toBe(true)
      expect(answers.booleanFalse).toBe(false)
      expect(answers.emptyString).toBe('')
    })

    it('should handle reset and complete again', () => {
      const {setAnswer, completeOnboarding, reset} = useOnboardingStore.getState()

      setAnswer('q1', 'a1')
      completeOnboarding()
      reset()
      setAnswer('q2', 'a2')
      completeOnboarding()

      const state = useOnboardingStore.getState()
      expect(state.answers).toEqual({q2: 'a2'})
      expect(state.completed).toBe(true)
    })
  })
})
