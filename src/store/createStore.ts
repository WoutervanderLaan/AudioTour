import AsyncStorage from '@react-native-async-storage/async-storage'
import {create, StateCreator, type StoreApi, type UseBoundStore} from 'zustand'
import {devtools, persist} from 'zustand/middleware'

import type {CreateStoreOptions} from './types'

/**
 * Factory function to create module stores with consistent middleware.
 * Automatically applies devtools middleware in development and optional persistence via AsyncStorage.
 *
 * @param stateCreator - Zustand state creator function that defines the store's state and actions
 * @param options - Configuration options for the store (name, devtools, persist)
 * @returns Zustand store hook with applied middleware
 */
export function createModuleStore<T extends object>(
  stateCreator: StateCreator<T>,
  options: CreateStoreOptions,
): UseBoundStore<StoreApi<T>> {
  let store = stateCreator

  if (options.devtools && __DEV__) {
    store = devtools(store, {name: options.name}) as StateCreator<T>
  }

  if (options.persist) {
    store = persist(store, {
      name: `${options.name}-storage`,
      storage: {
        getItem: async name => {
          const value = await AsyncStorage.getItem(name)
          return value ? JSON.parse(value) : null
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value))
        },
        removeItem: async name => {
          await AsyncStorage.removeItem(name)
        },
      },
    }) as StateCreator<T>
  }

  return create(store)
}
