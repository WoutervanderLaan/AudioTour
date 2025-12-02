import {createContext} from 'react'

import {ApiClient} from '@/shared/api/client-old'

export const ApiContext = createContext<ApiClient | undefined>(undefined)
