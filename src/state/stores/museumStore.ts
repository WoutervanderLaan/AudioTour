import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { ObjectItem } from "../../types";

type MuseumState = {
  currentMuseumId?: string;
  objects: ObjectItem[];
  setMuseum: (id?: string) => void;
  setObjects: (objects: ObjectItem[]) => void;
  reset: () => void;
};

export const useMuseumStore = create<MuseumState>()(
  immer((set, get) => ({
    currentMuseumId: undefined,
    objects: [],
    setMuseum: (id) =>
      set((state) => {
        state.currentMuseumId = id;
      }),
    reset: () =>
      set((state) => {
        state.objects = [];
        state.currentMuseumId = undefined;
      }),
    setObjects: (objects: ObjectItem[]) => {
      set((state) => {
        state.objects = objects;
      });
    },
  }))
);
