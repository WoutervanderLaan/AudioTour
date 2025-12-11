import {setupServer} from 'msw/node'

import {globalHandlers} from './handlers'

import {authHandlers} from '@/modules/auth/api/mocks'

export const server = setupServer(...globalHandlers, ...authHandlers)
