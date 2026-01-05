import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query'

import {historyKeys} from './keys'
import type {CommunityToursResponse, MyToursResponse} from './queries.types'

import {apiClient} from '@/core/api/client'
import type {PersistedTour} from '@/modules/history/types'
import {TIME} from '@/shared/types/Time'

/**
 * useMyToursQuery
 * React Query hook to fetch all tours belonging to the current user.
 *
 * @param options - Optional TanStack Query options
 * @returns Query result with tour summaries and status
 *
 * @example
 * ```tsx
 * const { data, isLoading } = useMyToursQuery()
 *
 * if (isLoading) return <Text>Loading...</Text>
 * return data?.tours.map(tour => <TourCard key={tour.id} tour={tour} />)
 * ```
 */
export const useMyToursQuery = (
  options?: Omit<UseQueryOptions<MyToursResponse>, 'queryKey' | 'queryFn'>,
): UseQueryResult<MyToursResponse, Error> => {
  return useQuery({
    queryKey: historyKeys.myTours(),
    queryFn: async () => {
      const response = await apiClient.get<MyToursResponse>('/tours')
      return response.data
    },
    staleTime: TIME.FIVE_MINUTES,
    ...options,
  })
}

/**
 * useTourByIdQuery
 * React Query hook to fetch a specific tour by its ID.
 *
 * @param tourId - The tour ID to fetch
 * @param options - Optional TanStack Query options
 * @returns Query result with tour data and status
 *
 * @example
 * ```tsx
 * const { data: tour, isLoading } = useTourByIdQuery('tour-123')
 *
 * if (isLoading) return <Text>Loading tour...</Text>
 * return <TourDetail tour={tour} />
 * ```
 */
export const useTourByIdQuery = (
  tourId: string,
  options?: Omit<UseQueryOptions<PersistedTour>, 'queryKey' | 'queryFn'>,
): UseQueryResult<PersistedTour, Error> => {
  return useQuery({
    queryKey: historyKeys.tour(tourId),
    queryFn: async () => {
      const response = await apiClient.get<PersistedTour>(`/tours/${tourId}`)
      return response.data
    },
    enabled: !!tourId,
    staleTime: TIME.TEN_MINUTES,
    ...options,
  })
}

/**
 * useCommunityToursQuery
 * React Query hook to fetch publicly shared tours from the community.
 *
 * @param options - Optional TanStack Query options
 * @returns Query result with community tour summaries and status
 *
 * @example
 * ```tsx
 * const { data, isLoading } = useCommunityToursQuery()
 *
 * if (isLoading) return <Text>Loading community tours...</Text>
 * return data?.tours.map(tour => <TourCard key={tour.id} tour={tour} />)
 * ```
 */
export const useCommunityToursQuery = (
  options?: Omit<
    UseQueryOptions<CommunityToursResponse>,
    'queryKey' | 'queryFn'
  >,
): UseQueryResult<CommunityToursResponse, Error> => {
  return useQuery({
    queryKey: historyKeys.communityTours(),
    queryFn: async () => {
      const response =
        await apiClient.get<CommunityToursResponse>('/tours/community')
      return response.data
    },
    staleTime: TIME.MINUTE * 2,
    ...options,
  })
}

/**
 * useToursByMuseumQuery
 * React Query hook to fetch tours for a specific museum.
 *
 * @param museumId - The museum ID to filter by
 * @param options - Optional TanStack Query options
 * @returns Query result with filtered tour summaries and status
 */
export const useToursByMuseumQuery = (
  museumId: string,
  options?: Omit<UseQueryOptions<MyToursResponse>, 'queryKey' | 'queryFn'>,
): UseQueryResult<MyToursResponse, Error> => {
  return useQuery({
    queryKey: historyKeys.toursByMuseum(museumId),
    queryFn: async () => {
      const response = await apiClient.get<MyToursResponse>(
        `/tours?museumId=${museumId}`,
      )
      return response.data
    },
    enabled: !!museumId,
    staleTime: TIME.FIVE_MINUTES,
    ...options,
  })
}
