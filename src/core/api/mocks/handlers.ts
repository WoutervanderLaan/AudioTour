import {http, HttpResponse, passthrough} from 'msw'

import {createHandler} from './createHandler'

export const globalHandlers = [
  http.post(createHandler('/process-artwork'), () => {
    return HttpResponse.json({
      object_id: 'abc-123',
      recognition_confidence: 2,
    })
  }),
  http.post(createHandler('/generate-narrative'), () => {
    return HttpResponse.json({
      text: 'This is a generated narrative',
    })
  }),
  http.post(createHandler('/generate-audio'), () => {
    return HttpResponse.json({
      audio_url:
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    })
  }),
  http.get(createHandler('/museum-objects/:museumId'), () => {
    return HttpResponse.json([])
  }),
  http.get(createHandler('/recommendations'), () => {
    return HttpResponse.json([])
  }),
  http.all('/symbolicate', () => passthrough()),
]
