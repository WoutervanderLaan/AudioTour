import {setupServer} from 'msw/native'

import {globalHandlers} from './handlers'

import {authHandlers} from '@/modules/auth/api/mocks'
import {notificationHandlers} from '@/modules/notifications/api/mocks'

export const server = setupServer(
  ...globalHandlers,
  ...authHandlers,
  ...notificationHandlers,
)
