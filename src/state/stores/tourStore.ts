import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type TourState = {
  lastPhotoUri?: string;
  currentObjectId?: string;
  recognitionConfidence?: number;
  narrativeText?: string;
  audioUrl?: string;
  setLastPhoto: (uri?: string) => void;
  setLastPhotoData: (
    uri: string,
    objectId: string,
    recognitionConfidence: number
  ) => void;
  setNarrativeText: (narrativeText: string) => void;
  setAudioUrl: (audioUrl: string) => void;
  reset: () => void;
};

export const useTourStore = create<TourState>()(
  immer((set) => ({
    lastPhotoUri: undefined,
    currentObjectId: undefined,
    recognitionConfidence: undefined,
    narrativeText: undefined,
    audioUrl: undefined,
    loading: false,
    error: undefined,
    setLastPhoto: (uri) =>
      set((state) => {
        state.lastPhotoUri = uri;
      }),
    reset: () =>
      set((state) => {
        state.lastPhotoUri = undefined;
        state.currentObjectId = undefined;
        state.recognitionConfidence = undefined;
        state.narrativeText = undefined;
        state.audioUrl = undefined;
      }),
    setLastPhotoData: (
      uri: string,
      objectId: string,
      recognitionConfidence: number
    ) => {
      set((state) => {
        state.lastPhotoUri = uri;
        state.currentObjectId = objectId;
        state.recognitionConfidence = recognitionConfidence;
      });
    },
    setNarrativeText: async (narrativeText: string) => {
      set((state) => {
        state.narrativeText = narrativeText;
      });
    },
    setAudioUrl: async (audioUrl: string) => {
      set((state) => {
        state.audioUrl = audioUrl;
      });
    },
  }))
);
