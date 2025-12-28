import {http, type HttpHandler, HttpResponse} from 'msw'

import {createHandler} from '@/core/api/mock-config/createHandler'
import {TIME} from '@/shared/types/Time'
import {wait} from '@/shared/utils/wait'

/**
 * MSW GET request handlers for tour-related API endpoints.
 * Currently empty - reserved for future GET endpoints.
 */
const tourGetHandlers: HttpHandler[] = []

/**
 * MSW POST request handlers for tour-related API endpoints.
 * Includes handlers for processing artwork, generating narratives, and generating audio.
 */
const tourPostHandlers = [
  http.post(createHandler('/process-artwork'), async () => {
    await wait(TIME.SECOND * 2)

    return HttpResponse.json({
      object_id: 'abc-123',
      recognition_confidence: 2,
    })
  }),
  http.post(createHandler('/generate-narrative'), async () => {
    await wait(TIME.SECOND * 2)

    return HttpResponse.json({
      text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    })
  }),
  http.post(createHandler('/generate-audio'), async () => {
    await wait(TIME.SECOND * 2)

    return HttpResponse.json({
      audio_url:
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    })
  }),
]

/**
 * Combined array of all tour-related MSW request handlers.
 * Used by MSW server configuration for mocking tour API endpoints in development.
 */
export const tourHandlers = [...tourGetHandlers, ...tourPostHandlers]
