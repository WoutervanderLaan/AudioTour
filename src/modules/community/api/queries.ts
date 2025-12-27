import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query'

import {communityKeys} from './keys'

import {apiClient} from '@/core/api/client'
import {
  COMMUNITY_TOURS_STALE_TIME,
  RECOMMENDED_TOURS_STALE_TIME,
  TOUR_DETAIL_STALE_TIME,
} from '@/modules/community/constants'
import type {
  CommunityFilterOptions,
  CommunityTour,
  CommunityTourSummary,
  NearbySearchParams,
  TourRating,
} from '@/modules/community/types'

/**
 * CommunityToursResponse
 * API response type for fetching community tours.
 */
export type CommunityToursResponse = {
  /**
   * Array of community tour summaries
   */
  tours: CommunityTourSummary[]
  /**
   * Total count of matching tours
   */
  total: number
}

/**
 * RecommendedToursResponse
 * API response type for fetching recommended tours.
 */
export type RecommendedToursResponse = {
  /**
   * Array of recommended tour summaries
   */
  tours: CommunityTourSummary[]
}

/**
 * NearbyToursResponse
 * API response type for fetching nearby tours.
 */
export type NearbyToursResponse = {
  /**
   * Array of nearby tour summaries with distance info
   */
  tours: CommunityTourSummary[]
}

/**
 * useCommunityToursQuery
 * React Query hook to fetch community tours with optional filters.
 *
 * @param filters - Optional filter options for the query
 * @param options - Optional TanStack Query options
 * @returns Query result with community tour summaries and status
 *
 * @example
 * ```tsx
 * const { data, isLoading } = useCommunityToursQuery({ minRating: 4 })
 *
 * if (isLoading) return <Text>Loading...</Text>
 * return data?.tours.map(tour => <TourCard key={tour.id} tour={tour} />)
 * ```
 */
export const useCommunityToursQuery = (
  filters?: CommunityFilterOptions,
  options?: Omit<
    UseQueryOptions<CommunityToursResponse>,
    'queryKey' | 'queryFn'
  >,
): UseQueryResult<CommunityToursResponse, Error> => {
  return useQuery({
    queryKey: communityKeys.tours(filters),
    queryFn: async () => {
      const params = new URLSearchParams()

      if (filters?.query !== undefined) {
        params.append('query', filters.query)
      }
      if (filters?.museumId !== undefined) {
        params.append('museumId', filters.museumId)
      }
      if (filters?.minRating !== undefined) {
        params.append('minRating', String(filters.minRating))
      }
      if (filters?.isOfficial !== undefined) {
        params.append('isOfficial', String(filters.isOfficial))
      }
      if (filters?.sortBy !== undefined) {
        params.append('sortBy', filters.sortBy)
      }
      if (filters?.tags !== undefined && filters.tags.length > 0) {
        params.append('tags', filters.tags.join(','))
      }

      const queryString = params.toString()
      const url =
        queryString.length > 0
          ? `/community/tours?${queryString}`
          : '/community/tours'

      const response = await apiClient.get<CommunityToursResponse>(url)
      return response.data
    },
    staleTime: COMMUNITY_TOURS_STALE_TIME,
    ...options,
  })
}

/**
 * useCommunityTourByIdQuery
 * React Query hook to fetch a specific community tour by its ID.
 *
 * @param tourId - The tour ID to fetch
 * @param options - Optional TanStack Query options
 * @returns Query result with community tour data and status
 *
 * @example
 * ```tsx
 * const { data: tour, isLoading } = useCommunityTourByIdQuery('tour-123')
 *
 * if (isLoading) return <Text>Loading tour...</Text>
 * return <TourDetail tour={tour} />
 * ```
 */
export const useCommunityTourByIdQuery = (
  tourId: string,
  options?: Omit<UseQueryOptions<CommunityTour>, 'queryKey' | 'queryFn'>,
): UseQueryResult<CommunityTour, Error> => {
  return useQuery({
    queryKey: communityKeys.tour(tourId),
    queryFn: async () => {
      const response = await apiClient.get<CommunityTour>(
        `/community/tours/${tourId}`,
      )
      return response.data
    },
    enabled: tourId.length > 0,
    staleTime: TOUR_DETAIL_STALE_TIME,
    ...options,
  })
}

/**
 * useRecommendedToursQuery
 * React Query hook to fetch personalized tour recommendations.
 *
 * @param options - Optional TanStack Query options
 * @returns Query result with recommended tour summaries and status
 *
 * @example
 * ```tsx
 * const { data, isLoading } = useRecommendedToursQuery()
 *
 * if (isLoading) return <Text>Loading recommendations...</Text>
 * return data?.tours.map(tour => <TourCard key={tour.id} tour={tour} />)
 * ```
 */
export const useRecommendedToursQuery = (
  options?: Omit<
    UseQueryOptions<RecommendedToursResponse>,
    'queryKey' | 'queryFn'
  >,
): UseQueryResult<RecommendedToursResponse, Error> => {
  return useQuery({
    queryKey: communityKeys.recommended(),
    queryFn: async () => {
      const response = await apiClient.get<RecommendedToursResponse>(
        '/community/tours/recommended',
      )
      return response.data
    },
    staleTime: RECOMMENDED_TOURS_STALE_TIME,
    ...options,
  })
}

/**
 * useNearbyToursQuery
 * React Query hook to fetch tours near a specific location.
 *
 * @param params - Location parameters (latitude, longitude, optional radius)
 * @param options - Optional TanStack Query options
 * @returns Query result with nearby tour summaries and status
 *
 * @example
 * ```tsx
 * const { data, isLoading } = useNearbyToursQuery({
 *   latitude: 52.3676,
 *   longitude: 4.9041,
 *   radiusKm: 5
 * })
 *
 * if (isLoading) return <Text>Loading nearby tours...</Text>
 * return data?.tours.map(tour => <TourCard key={tour.id} tour={tour} />)
 * ```
 */
export const useNearbyToursQuery = (
  params: NearbySearchParams | null,
  options?: Omit<UseQueryOptions<NearbyToursResponse>, 'queryKey' | 'queryFn'>,
): UseQueryResult<NearbyToursResponse, Error> => {
  const isEnabled = params !== null

  return useQuery({
    queryKey: isEnabled
      ? communityKeys.nearby(params)
      : communityKeys.nearby({latitude: 0, longitude: 0}),
    queryFn: async () => {
      if (params === null) {
        return {tours: []}
      }

      const queryParams = new URLSearchParams({
        lat: String(params.latitude),
        lng: String(params.longitude),
      })

      if (params.radiusKm !== undefined) {
        queryParams.append('radius', String(params.radiusKm))
      }

      const response = await apiClient.get<NearbyToursResponse>(
        `/community/tours/nearby?${queryParams.toString()}`,
      )
      return response.data
    },
    enabled: isEnabled,
    staleTime: COMMUNITY_TOURS_STALE_TIME,
    ...options,
  })
}

/**
 * useUserTourRatingQuery
 * React Query hook to fetch the current user's rating for a specific tour.
 *
 * @param tourId - The tour ID to check rating for
 * @param options - Optional TanStack Query options
 * @returns Query result with user's rating data and status
 */
export const useUserTourRatingQuery = (
  tourId: string,
  options?: Omit<UseQueryOptions<TourRating | null>, 'queryKey' | 'queryFn'>,
): UseQueryResult<TourRating | null, Error> => {
  return useQuery({
    queryKey: communityKeys.userRating(tourId),
    queryFn: async () => {
      try {
        const response = await apiClient.get<TourRating>(
          `/community/tours/${tourId}/my-rating`,
        )
        return response.data
      } catch {
        // No rating exists
        return null
      }
    },
    enabled: tourId.length > 0,
    staleTime: TOUR_DETAIL_STALE_TIME,
    ...options,
  })
}
