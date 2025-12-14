/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'

/**
 * TourState
 * Represents the state for managing an active audio tour session, including photo capture, object recognition, narrative generation, and audio playback.
 */
type TourState = {
  /**
   * URI of the last photo taken by the user during the tour, used for object recognition
   */
  lastPhotoUri?: string
  /**
   * Unique identifier of the currently recognized museum object from the photo
   */
  currentObjectId?: string
  /**
   * Confidence score (0-1) indicating the accuracy of the object recognition result
   */
  recognitionConfidence?: number
  /**
   * Generated narrative text describing the museum object and its context
   */
  narrativeText?: string
  /**
   * URL to the generated audio file containing the spoken narrative
   */
  audioUrl?: string
  /**
   * Updates the URI of the last captured photo
   */
  setLastPhoto: (uri?: string) => void
  /**
   * Updates the photo URI along with the recognized object ID and confidence score
   */
  setLastPhotoData: (
    uri: string,
    objectId: string,
    recognitionConfidence: number,
  ) => void
  /**
   * Updates the narrative text for the current tour object
   */
  setNarrativeText: (narrativeText: string) => void
  /**
   * Updates the audio URL for the current narrative
   */
  setAudioUrl: (audioUrl: string) => void
  /**
   * Resets all tour state to initial values, clearing photo, object, narrative, and audio data
   */
  reset: () => void
}

export const useTourStore = create<TourState>()(
  immer(set => ({
    lastPhotoUri: undefined,
    currentObjectId: undefined,
    recognitionConfidence: undefined,
    narrativeText: undefined,
    audioUrl: undefined,
    loading: false,
    error: undefined,
    setLastPhoto: uri =>
      set(state => {
        state.lastPhotoUri = uri
      }),
    reset: () =>
      set(state => {
        state.lastPhotoUri = undefined
        state.currentObjectId = undefined
        state.recognitionConfidence = undefined
        state.narrativeText = undefined
        state.audioUrl = undefined
      }),
    setLastPhotoData: (
      uri: string,
      objectId: string,
      recognitionConfidence: number,
    ) => {
      set(state => {
        state.lastPhotoUri = uri
        state.currentObjectId = objectId
        state.recognitionConfidence = recognitionConfidence
      })
    },
    setNarrativeText: (narrativeText: string) => {
      set(state => {
        state.narrativeText = narrativeText
      })
    },
    setAudioUrl: (audioUrl: string) => {
      set(state => {
        state.audioUrl = audioUrl
      })
    },
  })),
)
