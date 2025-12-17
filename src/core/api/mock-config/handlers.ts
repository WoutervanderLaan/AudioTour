import {http, passthrough} from 'msw'

import {authHandlers} from '@/modules/auth/api/mocks'
import {notificationHandlers} from '@/modules/notifications/api/mocks'
import {tourHandlers} from '@/modules/tour/api/mocks'

const globalHandlers = [http.all('/symbolicate', passthrough)]

export const handlers = [
  ...globalHandlers,
  ...authHandlers,
  ...notificationHandlers,
  ...tourHandlers,
]
