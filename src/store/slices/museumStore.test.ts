import {useMuseumStore, type ObjectItem} from './museumStore'

describe('museumStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    const {reset} = useMuseumStore.getState()
    reset()
  })

  describe('initial state', () => {
    it('should have undefined currentMuseumId', () => {
      const {currentMuseumId} = useMuseumStore.getState()
      expect(currentMuseumId).toBeUndefined()
    })

    it('should have empty objects array', () => {
      const {objects} = useMuseumStore.getState()
      expect(objects).toEqual([])
    })
  })

  describe('setMuseum', () => {
    it('should set the current museum ID', () => {
      const {setMuseum} = useMuseumStore.getState()

      setMuseum('museum-123')

      const {currentMuseumId} = useMuseumStore.getState()
      expect(currentMuseumId).toBe('museum-123')
    })

    it('should update museum ID', () => {
      const {setMuseum} = useMuseumStore.getState()

      setMuseum('museum-123')
      expect(useMuseumStore.getState().currentMuseumId).toBe('museum-123')

      setMuseum('museum-456')
      expect(useMuseumStore.getState().currentMuseumId).toBe('museum-456')
    })

    it('should set museum ID to undefined', () => {
      const {setMuseum} = useMuseumStore.getState()

      setMuseum('museum-123')
      expect(useMuseumStore.getState().currentMuseumId).toBe('museum-123')

      setMuseum(undefined)
      expect(useMuseumStore.getState().currentMuseumId).toBeUndefined()
    })

    it('should not affect objects when changing museum', () => {
      const {setMuseum, setObjects} = useMuseumStore.getState()
      const testObjects: ObjectItem[] = [
        {id: '1', name: 'Object 1'},
        {id: '2', name: 'Object 2'},
      ]

      setObjects(testObjects)
      setMuseum('museum-123')

      const {objects} = useMuseumStore.getState()
      expect(objects).toEqual(testObjects)
    })
  })

  describe('setObjects', () => {
    it('should set objects array', () => {
      const {setObjects} = useMuseumStore.getState()
      const testObjects: ObjectItem[] = [
        {id: '1', name: 'Mona Lisa', artist: 'Leonardo da Vinci'},
        {id: '2', name: 'Starry Night', artist: 'Vincent van Gogh'},
      ]

      setObjects(testObjects)

      const {objects} = useMuseumStore.getState()
      expect(objects).toEqual(testObjects)
    })

    it('should replace existing objects', () => {
      const {setObjects} = useMuseumStore.getState()
      const firstObjects: ObjectItem[] = [{id: '1', name: 'Object 1'}]
      const secondObjects: ObjectItem[] = [
        {id: '2', name: 'Object 2'},
        {id: '3', name: 'Object 3'},
      ]

      setObjects(firstObjects)
      expect(useMuseumStore.getState().objects).toEqual(firstObjects)

      setObjects(secondObjects)
      expect(useMuseumStore.getState().objects).toEqual(secondObjects)
    })

    it('should set empty objects array', () => {
      const {setObjects} = useMuseumStore.getState()
      const testObjects: ObjectItem[] = [{id: '1', name: 'Object 1'}]

      setObjects(testObjects)
      expect(useMuseumStore.getState().objects).toEqual(testObjects)

      setObjects([])
      expect(useMuseumStore.getState().objects).toEqual([])
    })

    it('should handle objects with all properties', () => {
      const {setObjects} = useMuseumStore.getState()
      const testObjects: ObjectItem[] = [
        {
          id: '1',
          name: 'The Starry Night',
          artist: 'Vincent van Gogh',
          date: '1889',
          museumIdd: 'moma',
          imageUrl: 'https://example.com/starry-night.jpg',
          generatedText: 'A beautiful night sky painting...',
          generatedAudio: 'https://example.com/audio.mp3',
          metadata: {style: 'Post-Impressionism', medium: 'oil on canvas'},
        },
      ]

      setObjects(testObjects)

      const {objects} = useMuseumStore.getState()
      expect(objects).toEqual(testObjects)
    })

    it('should handle large objects array', () => {
      const {setObjects} = useMuseumStore.getState()
      const largeArray: ObjectItem[] = Array.from({length: 100}, (_, i) => ({
        id: `obj-${i}`,
        name: `Object ${i}`,
      }))

      setObjects(largeArray)

      const {objects} = useMuseumStore.getState()
      expect(objects).toHaveLength(100)
      expect(objects[0]).toEqual({id: 'obj-0', name: 'Object 0'})
      expect(objects[99]).toEqual({id: 'obj-99', name: 'Object 99'})
    })
  })

  describe('reset', () => {
    it('should reset to initial state', () => {
      const {setMuseum, setObjects, reset} = useMuseumStore.getState()
      const testObjects: ObjectItem[] = [{id: '1', name: 'Object 1'}]

      setMuseum('museum-123')
      setObjects(testObjects)

      reset()

      const {currentMuseumId, objects} = useMuseumStore.getState()
      expect(currentMuseumId).toBeUndefined()
      expect(objects).toEqual([])
    })

    it('should reset only objects and museum ID', () => {
      const {setMuseum, setObjects, reset} = useMuseumStore.getState()

      setMuseum('museum-123')
      setObjects([{id: '1', name: 'Object 1'}])
      reset()

      // Verify we can still use the store after reset
      setMuseum('museum-456')
      expect(useMuseumStore.getState().currentMuseumId).toBe('museum-456')
    })
  })

  describe('edge cases', () => {
    it('should handle undefined in objects array', () => {
      const {setObjects} = useMuseumStore.getState()
      // This shouldn't normally happen, but test type coercion
      const testObjects = [{id: '1', name: 'Object 1'}] as ObjectItem[]

      setObjects(testObjects)

      const {objects} = useMuseumStore.getState()
      expect(objects).toEqual(testObjects)
    })

    it('should handle objects with minimal properties', () => {
      const {setObjects} = useMuseumStore.getState()
      const minimalObjects: ObjectItem[] = [{id: '1', name: 'Minimal'}]

      setObjects(minimalObjects)

      const {objects} = useMuseumStore.getState()
      expect(objects[0].artist).toBeUndefined()
      expect(objects[0].date).toBeUndefined()
      expect(objects[0].imageUrl).toBeUndefined()
    })

    it('should handle multiple sequential operations', () => {
      const {setMuseum, setObjects, reset} = useMuseumStore.getState()

      setMuseum('museum-1')
      setObjects([{id: '1', name: 'Object 1'}])
      reset()
      setMuseum('museum-2')
      setObjects([{id: '2', name: 'Object 2'}])

      const {currentMuseumId, objects} = useMuseumStore.getState()
      expect(currentMuseumId).toBe('museum-2')
      expect(objects).toEqual([{id: '2', name: 'Object 2'}])
    })
  })
})
