import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ApiClient } from "../../api/client";
import { useApi } from "../ApiContext";

type TourState = {
  lastPhotoUri?: string;
  currentObjectId?: string;
  recognitionConfidence?: number;
  narrativeText?: string;
  audioUrl?: string;
  loading: boolean;
  error?: string;
  setLastPhoto: (uri?: string) => void;
  uploadAndRecognize: (uri: string) => Promise<void>;
  generateNarrative: (objectId: string, sessionId: string) => Promise<void>;
  generateAudio: (text: string) => Promise<void>;
  reset: () => void;
};

export const useTourStore = create<TourState>()(
  immer((set, get) => ({
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
        state.error = undefined;
      }),
    uploadAndRecognize: async (uri: string) => {
      set((s) => {
        s.loading = true;
        s.error = undefined;
      });
      try {
        const api = useApi();

        const res = await api.uploadPhoto({ uri });

        set((s) => {
          s.currentObjectId = res.object_id;
          s.recognitionConfidence = res.recognition_confidence;
          s.lastPhotoUri = uri;
        });
      } catch (e: any) {
        set((s) => {
          s.error = e?.message || "Upload failed";
        });
      } finally {
        set((s) => {
          s.loading = false;
        });
      }
    },
    generateNarrative: async (objectId: string, sessionId: string) => {
      set((s) => {
        s.loading = true;
        s.error = undefined;
      });
      try {
        const api = useApi();
        const res = await api.generateNarrative({
          object_id: objectId,
          user_session_id: sessionId,
        });
        set((s) => {
          s.narrativeText = res.narrative_text;
        });
      } catch (e: any) {
        set((s) => {
          s.error = e?.message || "Narrative failed";
        });
      } finally {
        set((s) => {
          s.loading = false;
        });
      }
    },
    generateAudio: async (text: string) => {
      set((s) => {
        s.loading = true;
        s.error = undefined;
      });
      try {
        const api = useApi();
        const res = await api.generateAudio({ narrative_text: text });
        set((s) => {
          s.audioUrl = res.audio_url;
        });
      } catch (e: any) {
        set((s) => {
          s.error = e?.message || "Audio failed";
        });
      } finally {
        set((s) => {
          s.loading = false;
        });
      }
    },
  }))
);
