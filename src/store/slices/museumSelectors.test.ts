import {renderHook, act} from '@testing-library/react'

import {useMuseumStore} from './museumStore'
import {useCurrentMuseumId, useMuseumObjects, useMuseumActions} from './museumSelectors'

import type {ObjectItem} from '@/shared/types/types'

describe('museumSelectors', () => {
  beforeEach(() => {
    // Reset store
    useMuseumStore.getState().reset()
  })

  describe('useCurrentMuseumId', () => {
    it('should return undefined initially', () => {
      const {result} = renderHook(() => useCurrentMuseumId())

      expect(result.current).toBeUndefined()
    })

    it('should return museum ID when set', () => {
      act(() => {
        useMuseumStore.getState().setMuseum('museum-123')
      })

      const {result} = renderHook(() => useCurrentMuseumId())

      expect(result.current).toBe('museum-123')
    })

    it('should update when museum changes', () => {
      const {result} = renderHook(() => useCurrentMuseumId())

      act(() => {
        useMuseumStore.getState().setMuseum('museum-1')
      })
      expect(result.current).toBe('museum-1')

      act(() => {
        useMuseumStore.getState().setMuseum('museum-2')
      })
      expect(result.current).toBe('museum-2')
    })

    it('should return undefined when cleared', () => {
      act(() => {
        useMuseumStore.getState().setMuseum('museum-123')
      })

      const {result} = renderHook(() => useCurrentMuseumId())
      expect(result.current).toBe('museum-123')

      act(() => {
        useMuseumStore.getState().setMuseum(undefined)
      })
      expect(result.current).toBeUndefined()
    })
  })

  describe('useMuseumObjects', () => {
    it('should return empty array initially', () => {
      const {result} = renderHook(() => useMuseumObjects())

      expect(result.current).toEqual([])
    })

    it('should return objects when set', () => {
      const testObjects: ObjectItem[] = [
        {id: '1', name: 'Mona Lisa'},
        {id: '2', name: 'Starry Night'},
      ]

      act(() => {
        useMuseumStore.getState().setObjects(testObjects)
      })

      const {result} = renderHook(() => useMuseumObjects())

      expect(result.current).toEqual(testObjects)
    })

    it('should update when objects change', () => {
      const {result} = renderHook(() => useMuseumObjects())

      const firstObjects: ObjectItem[] = [{id: '1', name: 'Object 1'}]
      act(() => {
        useMuseumStore.getState().setObjects(firstObjects)
      })
      expect(result.current).toEqual(firstObjects)

      const secondObjects: ObjectItem[] = [
        {id: '2', name: 'Object 2'},
        {id: '3', name: 'Object 3'},
      ]
      act(() => {
        useMuseumStore.getState().setObjects(secondObjects)
      })
      expect(result.current).toEqual(secondObjects)
    })

    it('should return empty array after reset', () => {
      const testObjects: ObjectItem[] = [{id: '1', name: 'Test'}]

      act(() => {
        useMuseumStore.getState().setObjects(testObjects)
      })

      const {result} = renderHook(() => useMuseumObjects())
      expect(result.current).toEqual(testObjects)

      act(() => {
        useMuseumStore.getState().reset()
      })
      expect(result.current).toEqual([])
    })
  })

  describe('useMuseumActions', () => {
    it('should return action methods', () => {
      const {result} = renderHook(() => useMuseumActions())

      expect(result.current).toHaveProperty('setMuseum')
      expect(result.current).toHaveProperty('setObjects')
      expect(result.current).toHaveProperty('reset')
      expect(typeof result.current.setMuseum).toBe('function')
      expect(typeof result.current.setObjects).toBe('function')
      expect(typeof result.current.reset).toBe('function')
    })

    it('should set museum via action', () => {
      const {result} = renderHook(() => useMuseumActions())

      act(() => {
        result.current.setMuseum('museum-456')
      })

      expect(useMuseumStore.getState().currentMuseumId).toBe('museum-456')
    })

    it('should set objects via action', () => {
      const {result} = renderHook(() => useMuseumActions())
      const testObjects: ObjectItem[] = [{id: '1', name: 'Test'}]

      act(() => {
        result.current.setObjects(testObjects)
      })

      expect(useMuseumStore.getState().objects).toEqual(testObjects)
    })

    it('should reset via action', () => {
      const {result} = renderHook(() => useMuseumActions())

      act(() => {
        result.current.setMuseum('museum-123')
        result.current.setObjects([{id: '1', name: 'Test'}])
      })

      act(() => {
        result.current.reset()
      })

      const state = useMuseumStore.getState()
      expect(state.currentMuseumId).toBeUndefined()
      expect(state.objects).toEqual([])
    })

    it('should maintain stable reference', () => {
      const {result, rerender} = renderHook(() => useMuseumActions())

      const firstReference = result.current

      rerender()

      expect(result.current).toBe(firstReference)
    })
  })

  describe('integration tests', () => {
    it('should work together across selectors', () => {
      const {result: idResult} = renderHook(() => useCurrentMuseumId())
      const {result: objectsResult} = renderHook(() => useMuseumObjects())
      const {result: actionsResult} = renderHook(() => useMuseumActions())

      const testObjects: ObjectItem[] = [{id: '1', name: 'Test Object'}]

      act(() => {
        actionsResult.current.setMuseum('museum-789')
        actionsResult.current.setObjects(testObjects)
      })

      expect(idResult.current).toBe('museum-789')
      expect(objectsResult.current).toEqual(testObjects)

      act(() => {
        actionsResult.current.reset()
      })

      expect(idResult.current).toBeUndefined()
      expect(objectsResult.current).toEqual([])
    })
  })
})
