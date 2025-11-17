import * as Location from 'expo-location'
import {useEffect, useRef, useState} from 'react'

/**
 * Coordinates
 * TODO: describe what this type represents.
 */
export type Coordinates = {
  /**
   * latitude
   */
  latitude: number /**
   * longitude
   */
  longitude: number
}

/**
 * haversineDistanceMeters
 * TODO: describe what it does.
 *
 * @param {*} a
 * @param {*} b
 * @returns {*} describe return value
 */
export function haversineDistanceMeters(
  a: Coordinates,
  b: Coordinates,
): number {
  const R = 6371e3 // meters

  /**
   * toRad
   * TODO: describe what it does.
   *
   * @param {*} deg
   * @returns {*} describe return value
   */
  const toRad = (deg: number): number => (deg * Math.PI) / 180
  const dLat = toRad(b.latitude - a.latitude)
  const dLon = toRad(b.longitude - a.longitude)
  const lat1 = toRad(a.latitude)
  const lat2 = toRad(b.latitude)
  const sinDLat = Math.sin(dLat / 2)
  const sinDLon = Math.sin(dLon / 2)
  const h =
    sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
  return R * c
}

/**
 * UseUserLocationOptions
 * TODO: describe what this type represents.
 */
export type UseUserLocationOptions = {
  /**
   * shouldWatch
   */
  shouldWatch?: boolean
  /**
   * accuracy
   */
  accuracy?: Location.LocationAccuracy
  /**
   * distanceInterval
   */
  distanceInterval?: number
}

/**
 * useUserLocation
 * TODO: describe what it does.
 *
 * @param {*} options
 * @returns {*} describe return value
 */
export function useUserLocation(options: UseUserLocationOptions = {}): {
  readonly coords: Coordinates | undefined
  readonly permissionStatus: Location.PermissionStatus | 'undetermined'
  readonly error: string | undefined
} {
  const [coords, setCoords] = useState<Coordinates | undefined>(undefined)

  const [permissionStatus, setPermissionStatus] = useState<
    Location.PermissionStatus | 'undetermined'
  >('undetermined')

  const [error, setError] = useState<string | undefined>(undefined)

  const watchSub = useRef<Location.LocationSubscription | null>(null)

  const {
    shouldWatch = false,
    accuracy = Location.Accuracy.Balanced,
    distanceInterval = 20,
  } = options

  useEffect(() => {
    let isMounted = true

    /**
     * run
     * TODO: describe what it does.
     *
     * @returns {*} describe return value
     */
    const run = async (): Promise<void> => {
      try {
        const {status} = await Location.requestForegroundPermissionsAsync()

        if (!isMounted) return

        setPermissionStatus(status)

        if (status !== 'granted') {
          setError('Location permission not granted')
          return
        }

        const last = await Location.getLastKnownPositionAsync()

        if (last && isMounted) {
          setCoords({
            latitude: last.coords.latitude,
            longitude: last.coords.longitude,
          })
        } else {
          const current = await Location.getCurrentPositionAsync({accuracy})

          if (!isMounted) return

          setCoords({
            latitude: current.coords.latitude,
            longitude: current.coords.longitude,
          })
        }

        if (shouldWatch) {
          watchSub.current = await Location.watchPositionAsync(
            {accuracy, distanceInterval},
            loc => {
              if (!isMounted) return

              setCoords({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
              })
            },
          )
        }
      } catch (e: any) {
        if (!isMounted) return

        setError(e?.message || 'Failed to get location')
      }
    }
    run()

    return (): void => {
      isMounted = false
      watchSub.current?.remove()
      watchSub.current = null
    }
  }, [shouldWatch, accuracy, distanceInterval])

  return {coords, permissionStatus, error} as const
}
