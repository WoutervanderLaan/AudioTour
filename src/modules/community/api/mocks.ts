import {http, HttpResponse} from 'msw'

import type {
  CommunityToursResponse,
  NearbyToursResponse,
  RecommendedToursResponse,
} from './queries'

import type {
  CommunityTour,
  CommunityTourSummary,
} from '@/modules/community/types'

/**
 * Mock community tour data for development and testing.
 */
const mockTourSummaries: CommunityTourSummary[] = [
  {
    id: 'community-tour-1',
    title: 'Highlights of the Rijksmuseum',
    description:
      'Discover the most iconic masterpieces of Dutch Golden Age painting.',
    heroImageUri: 'https://picsum.photos/seed/tour1/400/300',
    museumName: 'Rijksmuseum',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
    communityRating: 4.8,
    ratingCount: 156,
    artworkCount: 12,
    author: {displayName: 'Museum Guide'},
    isOfficial: true,
    downloadCount: 1234,
    tags: ['masterpieces', 'dutch', 'golden-age'],
  },
  {
    id: 'community-tour-2',
    title: 'Van Gogh Essentials',
    description: "A journey through Vincent van Gogh's most celebrated works.",
    heroImageUri: 'https://picsum.photos/seed/tour2/400/300',
    museumName: 'Van Gogh Museum',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14,
    communityRating: 4.9,
    ratingCount: 243,
    artworkCount: 15,
    author: {displayName: 'Art Enthusiast'},
    isOfficial: false,
    downloadCount: 2156,
    tags: ['van-gogh', 'impressionism', 'post-impressionism'],
  },
  {
    id: 'community-tour-3',
    title: 'Modern Art Adventure',
    description: 'Explore contemporary masterpieces and installations.',
    heroImageUri: 'https://picsum.photos/seed/tour3/400/300',
    museumName: 'Stedelijk Museum',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
    communityRating: 4.5,
    ratingCount: 89,
    artworkCount: 8,
    author: {displayName: 'Modern Art Lover'},
    isOfficial: false,
    downloadCount: 567,
    tags: ['modern', 'contemporary', 'installations'],
  },
  {
    id: 'community-tour-4',
    title: 'Hidden Gems of Amsterdam',
    description: 'Uncover lesser-known treasures in Amsterdam museums.',
    heroImageUri: 'https://picsum.photos/seed/tour4/400/300',
    museumName: 'Various Museums',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 21,
    communityRating: 4.6,
    ratingCount: 72,
    artworkCount: 10,
    author: {displayName: 'Local Explorer'},
    isOfficial: false,
    downloadCount: 445,
    tags: ['hidden-gems', 'amsterdam', 'local'],
  },
]

/**
 * Mock full community tour data.
 */
const mockFullTour: CommunityTour = {
  id: 'community-tour-1',
  createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
  updatedAt: Date.now() - 1000 * 60 * 60 * 24,
  title: 'Highlights of the Rijksmuseum',
  description:
    "Discover the most iconic masterpieces of Dutch Golden Age painting. This tour takes you through the museum's finest collection, featuring works by Rembrandt, Vermeer, and other Dutch masters.",
  heroImageUri: 'https://picsum.photos/seed/tour1/400/300',
  museumId: 'rijksmuseum',
  museumName: 'Rijksmuseum',
  coordinates: {latitude: 52.36, longitude: 4.8852},
  feedItems: [
    {
      id: 'feed-item-1',
      photos: ['https://picsum.photos/seed/art1/400/400'],
      metadata: {
        title: 'The Night Watch',
        artist: 'Rembrandt van Rijn',
        year: '1642',
        description: 'One of the most famous paintings in Dutch history.',
      },
      objectId: 'artwork-1',
      audioUrl: 'https://example.com/audio/night-watch.mp3',
      createdAt: Date.now() - 1000 * 60 * 60,
      status: 'ready',
    },
    {
      id: 'feed-item-2',
      photos: ['https://picsum.photos/seed/art2/400/400'],
      metadata: {
        title: 'The Milkmaid',
        artist: 'Johannes Vermeer',
        year: '1658',
        description: 'A masterpiece of Dutch genre painting.',
      },
      objectId: 'artwork-2',
      audioUrl: 'https://example.com/audio/milkmaid.mp3',
      createdAt: Date.now() - 1000 * 60 * 30,
      status: 'ready',
    },
  ],
  userId: 'user-1',
  sessionId: 'session-1',
  isShared: true,
  isOfficial: true,
  communityRating: 4.8,
  ratingCount: 156,
  syncStatus: 'synced',
  author: {
    id: 'author-1',
    displayName: 'Museum Guide',
    avatarUrl: 'https://picsum.photos/seed/avatar1/100/100',
  },
  downloadCount: 1234,
  tags: ['masterpieces', 'dutch', 'golden-age'],
}

/**
 * MSW handlers for community module API endpoints.
 */
export const communityMockHandlers = [
  /**
   * GET /community/tours - List community tours with filters
   */
  http.get('*/community/tours', ({request}) => {
    const url = new URL(request.url)
    const minRating = url.searchParams.get('minRating')
    const isOfficial = url.searchParams.get('isOfficial')
    const query = url.searchParams.get('query')

    let filteredTours = [...mockTourSummaries]

    if (minRating !== null) {
      const threshold = parseFloat(minRating)
      filteredTours = filteredTours.filter(t => t.communityRating >= threshold)
    }

    if (isOfficial === 'true') {
      filteredTours = filteredTours.filter(t => t.isOfficial)
    }

    if (query !== null && query.length > 0) {
      const lowerQuery = query.toLowerCase()
      filteredTours = filteredTours.filter(
        t =>
          t.title.toLowerCase().includes(lowerQuery) ||
          t.description.toLowerCase().includes(lowerQuery),
      )
    }

    const response: CommunityToursResponse = {
      tours: filteredTours,
      total: filteredTours.length,
    }

    return HttpResponse.json(response)
  }),

  /**
   * GET /community/tours/recommended - Get personalized recommendations
   */
  http.get('*/community/tours/recommended', () => {
    const response: RecommendedToursResponse = {
      tours: mockTourSummaries.slice(0, 3),
    }

    return HttpResponse.json(response)
  }),

  /**
   * GET /community/tours/nearby - Get nearby tours
   */
  http.get('*/community/tours/nearby', () => {
    const toursWithDistance = mockTourSummaries.map((tour, index) => ({
      ...tour,
      distanceMeters: (index + 1) * 500,
    }))

    const response: NearbyToursResponse = {
      tours: toursWithDistance,
    }

    return HttpResponse.json(response)
  }),

  /**
   * GET /community/tours/:id - Get single tour details
   */
  http.get('*/community/tours/:id', ({params}) => {
    const {id} = params

    if (id === mockFullTour.id) {
      return HttpResponse.json(mockFullTour)
    }

    // Create a mock tour for other IDs
    const summary = mockTourSummaries.find(t => t.id === id)
    if (summary !== undefined) {
      const tour: CommunityTour = {
        ...mockFullTour,
        ...summary,
        author: {
          id: 'author-1',
          displayName: summary.author.displayName,
        },
      }
      return HttpResponse.json(tour)
    }

    return new HttpResponse(null, {status: 404})
  }),

  /**
   * GET /community/tours/:id/my-rating - Get user's rating for a tour
   */
  http.get('*/community/tours/:id/my-rating', () => {
    // Return 404 to indicate no rating exists
    return new HttpResponse(null, {status: 404})
  }),

  /**
   * POST /community/tours/:id/rate - Submit a tour rating
   */
  http.post('*/community/tours/:id/rate', async ({request}) => {
    const body = (await request.json()) as {rating: number}

    return HttpResponse.json({
      rating: {
        id: `rating-${Date.now()}`,
        tourId: 'tour-1',
        userId: 'user-1',
        rating: body.rating,
        createdAt: Date.now(),
      },
      averageRating: 4.7,
      ratingCount: 157,
      message: 'Rating submitted successfully',
    })
  }),

  /**
   * POST /community/tours/:id/report - Report a tour
   */
  http.post('*/community/tours/:id/report', () => {
    return HttpResponse.json({
      reportId: `report-${Date.now()}`,
      message: 'Report submitted successfully. We will review it shortly.',
    })
  }),
]
