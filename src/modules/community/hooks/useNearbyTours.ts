import {useMemo} from 'react'

import {useNearbyToursQuery} from '../api/queries'
import {DEFAULT_NEARBY_RADIUS_KM} from '../constants'
import type {CommunityTourSummary, NearbySearchParams} from '../types'

import {useUserLocation} from '@/shared/hooks/useUserLocation'

/**
 * UseNearbyToursResult
 * Return type for the useNearbyTours hook.
 */
type UseNearbyToursResult = {
  /**
   * Array of nearby tour summaries sorted by distance
   */
  tours: CommunityTourSummary[]
  /**
   * Whether the query is currently loading
   */
  isLoading: boolean
  /**
   * Whether the query encountered an error
   */
  isError: boolean
  /**
   * Error object if the query failed
   */
  error: Error | null
  /**
   * Whether the nearby tours list is empty
   */
  isEmpty: boolean
  /**
   * Location permission/access error message, if any
   */
  locationError: string | null
  /**
   * Function to refetch the nearby tours
   */
  refetch: () => void
}

/**
 * UseNearbyToursOptions
 * Options for the useNearbyTours hook.
 */
type UseNearbyToursOptions = {
  /**
   * Search radius in kilometers
   * @default 10
   */
  radiusKm?: number
}

/**
 * useNearbyTours
 * Hook for fetching tours near the user's current location.
 * Automatically requests location permission and handles errors gracefully.
 *
 * Tours are returned sorted by distance with distance information included.
 *
 * @param options - Optional configuration
 * @returns Object containing nearby tours and query state
 *
 * @example
 * ```tsx
 * const { tours, isLoading, locationError, isEmpty } = useNearbyTours({
 *   radiusKm: 5
 * })
 *
 * if (isLoading) return <LoadingSpinner />
 * if (locationError) return <LocationPermissionPrompt />
 * if (isEmpty) return <NoNearbyTours />
 * return (
 *   <FlatList
 *     data={tours}
 *     renderItem={({ item }) => (
 *       <TourCard
 *         tour={item}
 *         distance={item.distanceMeters}
 *       />
 *     )}
 *   />
 * )
 * ```
 */
export const useNearbyTours = (
  options: UseNearbyToursOptions = {},
): UseNearbyToursResult => {
  const {radiusKm = DEFAULT_NEARBY_RADIUS_KM} = options

  const {coords, error: locationError} = useUserLocation()

  const searchParams: NearbySearchParams | null = useMemo(() => {
    if (coords === undefined) {
      return null
    }

    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
      radiusKm,
    }
  }, [coords, radiusKm])

  const {data, isLoading, isError, error, refetch} =
    useNearbyToursQuery(searchParams)

  const tours = useMemo(() => data?.tours ?? [], [data?.tours])
  const isEmpty = !isLoading && coords !== undefined && tours.length === 0

  return {
    tours,
    isLoading: isLoading || coords === undefined,
    isError,
    error: error ?? null,
    isEmpty,
    locationError: locationError ?? null,
    refetch,
  }
}
