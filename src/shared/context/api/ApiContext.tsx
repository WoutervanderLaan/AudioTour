import {createContext} from 'react'

import {ApiClient} from '@/core/api/client-old'

export const ApiContext = createContext<ApiClient | undefined>(undefined)
