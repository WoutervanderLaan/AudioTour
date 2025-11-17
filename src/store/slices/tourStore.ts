/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'

/**
 * TourState
 * TODO: describe what this type represents.
 */
type TourState = {
  /**
   * lastPhotoUri
   */
  lastPhotoUri?: string
  /**
   * currentObjectId
   */
  currentObjectId?: string
  /**
   * recognitionConfidence
   */
  recognitionConfidence?: number
  /**
   * narrativeText
   */
  narrativeText?: string
  /**
   * audioUrl
   */
  audioUrl?: string
  /**
   * setLastPhoto
   */
  setLastPhoto: (uri?: string) => void
  /**
   * setLastPhotoData
   */
  setLastPhotoData: (
    uri: string,
    objectId: string,
    recognitionConfidence: number,
  ) => void
  /**
   * setNarrativeText
   */
  setNarrativeText: (narrativeText: string) => void
  /**
   * setAudioUrl
   */
  setAudioUrl: (audioUrl: string) => void
  /**
   * reset
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
