import {http, type HttpHandler, HttpResponse} from 'msw'

import {createHandler} from '@/core/api/mock-config/createHandler'
import {wait} from '@/shared/utils/wait'

const TIMEOUT = 2000

const tourGetHandlers: HttpHandler[] = []

const tourPostHandlers = [
  http.post(createHandler('/process-artwork'), async () => {
    await wait(TIMEOUT)

    return HttpResponse.json({
      object_id: 'abc-123',
      recognition_confidence: 2,
    })
  }),
  http.post(createHandler('/generate-narrative'), async () => {
    await wait(TIMEOUT)

    return HttpResponse.json({
      text: 'This is a generated narrative',
    })
  }),
  http.post(createHandler('/generate-audio'), async () => {
    await wait(TIMEOUT)

    return HttpResponse.json({
      audio_url:
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    })
  }),
]

export const tourHandlers = [...tourGetHandlers, ...tourPostHandlers]
