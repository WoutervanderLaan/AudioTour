import {http, HttpResponse, passthrough} from 'msw'

import {createHandler} from './createHandler'

import {wait} from '@/shared/utils/wait'

/**
 * Global MSW (Mock Service Worker) handlers for core API endpoints.
 *
 * Provides mock responses for:
 * - POST /process-artwork - Returns mock object recognition result
 * - POST /generate-narrative - Returns mock narrative text
 * - POST /generate-audio - Returns mock audio URL
 * - GET /museum-objects/:museumId - Returns empty array of museum objects
 * - GET /recommendations - Returns mock recommendation scores
 * - ALL /symbolicate - Passes through to allow React Native symbolication
 */
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
  http.get(createHandler('/recommendations'), async () => {
    await wait(3000)

    return HttpResponse.json([
      {object_id: 'abc-123', score: 0.95},
      {object_id: 'abc-234', score: 0.95},
      {object_id: 'abc-345', score: 0.95},
      {object_id: 'abc-456', score: 0.9},
      {object_id: 'abc-567', score: 0.8},
    ])
  }),
  http.all('/symbolicate', () => passthrough()),
]
