import {useEffect, useState} from 'react'

import {logger} from '@/core/lib/logger/logger'
import {KNOWN_MUSEUMS, type MuseumLocation} from '@/shared/constants/museums'
import {
  haversineDistanceMeters,
  useUserLocation,
} from '@/shared/hooks/useUserLocation'
import {useMuseumStore} from '@/store/slices/museumStore'
import {useUserSessionStore} from '@/store/slices/userSessionStore'

/**
 * UseTourInitializationReturn
 * Return type for the useTourInitialization hook
 */
type UseTourInitializationReturn = {
  /**
   * Whether the initialization is in progress
   */
  isLoading: boolean
  /**
   * Error message if initialization failed
   */
  error: string | undefined
  /**
   * The nearest museum found (if any)
   */
  nearestMuseum: MuseumLocation | undefined
  /**
   * Whether initialization is complete
   */
  isInitialized: boolean
}

const NEARBY_MUSEUM_RADIUS_METERS = 5000 // 5km

/**
 * useTourInitialization
 * Hook for initializing a new tour session with location services and museum detection.
 * Requests location permissions, gets user location, finds nearest museum, and sets up tour session.
 *
 * @returns Initialization state including loading, error, nearest museum, and completion status
 */
export function useTourInitialization(): UseTourInitializationReturn {
  const [isInitialized, setIsInitialized] = useState(false)
  const [nearestMuseum, setNearestMuseum] = useState<
    MuseumLocation | undefined
  >(undefined)

  const {coords, permissionStatus, error: locationError} = useUserLocation()

  const setMuseum = useMuseumStore(state => state.setMuseum)
  const regenerateSession = useUserSessionStore(
    state => state.regenerateSession,
  )

  const isLoading = permissionStatus === 'undetermined' || !coords
  const error = locationError

  useEffect(() => {
    if (coords && !isInitialized) {
      logger.debug('[Tour] Initializing tour with location:', coords)

      // Find nearest museum
      const museumsWithDistance = KNOWN_MUSEUMS.map(museum => ({
        ...museum,
        distance: haversineDistanceMeters(coords, museum.coords),
      })).sort((a, b) => a.distance - b.distance)

      const nearest = museumsWithDistance[0]

      if (
        nearest !== undefined &&
        nearest.distance <= NEARBY_MUSEUM_RADIUS_METERS
      ) {
        logger.debug('[Tour] Found nearby museum:', nearest.name, {
          distance: nearest.distance,
        })
        setNearestMuseum(nearest)
        setMuseum(nearest.id)
      } else {
        logger.debug('[Tour] No museums nearby')
        setNearestMuseum(undefined)
        setMuseum(undefined)
      }

      // Generate new session ID for this tour
      regenerateSession()

      setIsInitialized(true)
    }
  }, [coords, isInitialized, setMuseum, regenerateSession])

  return {
    isLoading,
    error,
    nearestMuseum,
    isInitialized,
  }
}
