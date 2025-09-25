import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { ObjectItem } from "../../types";
import { useApi } from "../ApiContext";

type MuseumState = {
  currentMuseumId?: string;
  objects: ObjectItem[];
  loading: boolean;
  error?: string;
  setMuseum: (id?: string) => void;
  fetchObjects: () => Promise<void>;
  reset: () => void;
};

export const useMuseumStore = create<MuseumState>()(
  immer((set, get) => ({
    currentMuseumId: undefined,
    objects: [],
    loading: false,
    error: undefined,
    setMuseum: (id) =>
      set((s) => {
        s.currentMuseumId = id;
      }),
    reset: () =>
      set((s) => {
        s.objects = [];
        s.error = undefined;
      }),
    fetchObjects: async () => {
      const id = get().currentMuseumId;
      if (!id) return;
      set((s) => {
        s.loading = true;
        s.error = undefined;
      });
      try {
        const api = useApi();
        const data = await api.listMuseumObjects(id);
        set((s) => {
          s.objects = data as any;
        });
      } catch (e: any) {
        set((s) => {
          s.error = e?.message || "Failed to load objects";
        });
      } finally {
        set((s) => {
          s.loading = false;
        });
      }
    },
  }))
);
