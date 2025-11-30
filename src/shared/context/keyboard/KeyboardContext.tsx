import {createContext} from 'react'

import type {KeyboardContextValue} from './KeyboardContext.types'

export const KeyboardContext = createContext<KeyboardContextValue | undefined>(
  undefined,
)
