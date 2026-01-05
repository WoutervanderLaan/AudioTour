import {http, HttpResponse} from 'msw'

import {createHandler} from '@/core/api/mock-config/createHandler'
import {datetime} from '@/core/lib/datetime'
import type {PersistedTour, TourSummary} from '@/modules/history/types'
import {TIME} from '@/shared/types/Time'
import {wait} from '@/shared/utils/wait'

/**
 * createMockTourSummary
 * Creates a mock tour summary for testing and development.
 *
 * @param id - Unique identifier for the tour
 * @param index - Index used for generating varied data
 * @returns Mock TourSummary object
 */
const createMockTourSummary = (id: string, index: number): TourSummary => ({
  id,
  title: `Museum Tour ${index + 1}`,
  description: `A wonderful tour featuring ${3 + index} amazing artworks`,
  heroImageUri: `https://picsum.photos/seed/${id}/400/300`,
  museumName: index % 2 === 0 ? 'Rijksmuseum' : 'Van Gogh Museum',
  createdAt: datetime().subtract(index, 'day').valueOf(),
  communityRating: 3.5 + (index % 3) * 0.5,
  ratingCount: 10 + index * 5,
  artworkCount: 3 + index,
})

/**
 * createMockPersistedTour
 * Creates a complete mock persisted tour for testing and development.
 *
 * @param id - Unique identifier for the tour
 * @returns Mock PersistedTour object with sample feed items
 */
const createMockPersistedTour = (id: string): PersistedTour => ({
  id,
  createdAt: datetime().subtract(1, 'day').valueOf(),
  updatedAt: datetime().valueOf(),
  title: 'Mock Museum Tour',
  description: 'A wonderful tour of amazing artworks',
  heroImageUri: `https://picsum.photos/seed/${id}/400/300`,
  museumId: 'rijksmuseum',
  museumName: 'Rijksmuseum',
  coordinates: {latitude: 52.3599, longitude: 4.8852},
  feedItems: [
    {
      id: 'feed-1',
      photos: [`https://picsum.photos/seed/${id}-1/400/300`],
      status: 'ready',
      createdAt: datetime().subtract(1, 'hour').valueOf(),
      metadata: {
        title: 'The Night Watch',
        artist: 'Rembrandt',
        year: '1642',
      },
      narrativeText:
        'The Night Watch is a famous painting by Rembrandt van Rijn...',
      audioUrl: 'https://example.com/audio/night-watch.mp3',
    },
    {
      id: 'feed-2',
      photos: [`https://picsum.photos/seed/${id}-2/400/300`],
      status: 'ready',
      createdAt: datetime().subtract(30, 'minute').valueOf(),
      metadata: {
        title: 'The Milkmaid',
        artist: 'Johannes Vermeer',
        year: '1658',
      },
      narrativeText: 'The Milkmaid is a masterpiece by Johannes Vermeer...',
      audioUrl: 'https://example.com/audio/milkmaid.mp3',
    },
  ],
  userId: 'user-123',
  sessionId: 'session-456',
  isShared: false,
  isOfficial: false,
  communityRating: 4.2,
  ratingCount: 15,
  syncStatus: 'synced',
})

const mockMyTours: TourSummary[] = Array.from({length: 5}, (_, i) =>
  createMockTourSummary(`tour-${i + 1}`, i),
)

const mockCommunityTours: TourSummary[] = Array.from({length: 10}, (_, i) =>
  createMockTourSummary(`community-tour-${i + 1}`, i),
)

/**
 * MSW handlers for history GET endpoints.
 *
 * Provides mock responses for:
 * - GET /tours - Returns user's tour summaries
 * - GET /tours/community - Returns shared community tours
 * - GET /tours/:id - Returns a specific tour by ID
 */
const historyGetHandlers = [
  http.get(createHandler('/tours'), async ({request}) => {
    await wait(TIME.SECOND)

    const url = new URL(request.url)
    const museumId = url.searchParams.get('museumId')

    let tours = mockMyTours

    if (museumId) {
      tours = mockMyTours.filter(
        tour =>
          tour.museumName.toLowerCase().includes(museumId.toLowerCase()) ||
          museumId === 'rijksmuseum',
      )
    }

    return HttpResponse.json({
      tours,
      total: tours.length,
    })
  }),

  http.get(createHandler('/tours/community'), async () => {
    await wait(TIME.SECOND)

    return HttpResponse.json({
      tours: mockCommunityTours,
      total: mockCommunityTours.length,
    })
  }),

  http.get(createHandler('/tours/:id'), async ({params}) => {
    await wait(TIME.SECOND)

    const {id} = params as {id: string}

    return HttpResponse.json(createMockPersistedTour(id))
  }),
]

/**
 * MSW handlers for history POST/PATCH/DELETE endpoints.
 *
 * Provides mock responses for:
 * - POST /tours - Creates a new tour
 * - PATCH /tours/:id - Updates a tour
 * - PATCH /tours/:id/share - Shares/unshares a tour
 * - DELETE /tours/:id - Deletes a tour
 */
const historyPostHandlers = [
  http.post(createHandler('/tours'), async ({request}) => {
    await wait(TIME.SECOND)

    const body = (await request.json()) as Partial<PersistedTour>

    const tour: PersistedTour = {
      ...createMockPersistedTour(body.id ?? 'new-tour-id'),
      ...body,
      syncStatus: 'synced',
    }

    return HttpResponse.json({
      tour,
      message: 'Tour saved successfully',
    })
  }),
]

const historyPatchHandlers = [
  http.patch(createHandler('/tours/:id'), async ({params, request}) => {
    await wait(TIME.SECOND)

    const {id} = params as {id: string}
    const updates = (await request.json()) as Partial<PersistedTour>

    const tour: PersistedTour = {
      ...createMockPersistedTour(id),
      ...updates,
      updatedAt: datetime().valueOf(),
    }

    return HttpResponse.json({
      tour,
      message: 'Tour updated successfully',
    })
  }),

  http.patch(createHandler('/tours/:id/share'), async ({params, request}) => {
    await wait(TIME.SECOND)

    const {id} = params as {id: string}
    const {isShared} = (await request.json()) as {isShared: boolean}

    const tour: PersistedTour = {
      ...createMockPersistedTour(id),
      isShared,
      updatedAt: datetime().valueOf(),
    }

    return HttpResponse.json({
      tour,
      message: isShared ? 'Tour shared successfully' : 'Tour unshared',
    })
  }),
]

const historyDeleteHandlers = [
  http.delete(createHandler('/tours/:id'), async () => {
    await wait(TIME.SECOND)

    return HttpResponse.json({
      message: 'Tour deleted successfully',
    })
  }),
]

/**
 * Combined array of all history MSW mock handlers.
 *
 * Combines GET, POST, PATCH, and DELETE handlers to provide a complete
 * set of history endpoint mocks for development and testing.
 */
export const historyHandlers = [
  ...historyGetHandlers,
  ...historyPostHandlers,
  ...historyPatchHandlers,
  ...historyDeleteHandlers,
]
