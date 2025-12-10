import React from 'react'
import {ActivityIndicator, FlatList} from 'react-native'

import {useShallow} from 'zustand/react/shallow'

import {Column} from '@/shared/components/ui/layout/Column'
import {PressableBase} from '@/shared/components/ui/pressable/PressableBase'
import {Screen} from '@/shared/components/ui/screen'
import {Text} from '@/shared/components/ui/typography'
import {KNOWN_MUSEUMS, type MuseumLocation} from '@/shared/constants/museums'
import {
  haversineDistanceMeters,
  useUserLocation,
} from '@/shared/hooks/useUserLocation'
import {useMuseumStore} from '@/store/slices/museumStore'

/**
 * Museum
 * Screen that displays a list of nearby museums sorted by distance from the user's current location.
 *
 * @returns Museum selection screen component
 */
export const Museum = (): React.JSX.Element => {
  const [loading, setLoading] = React.useState(true)

  const {currentMuseumId, setMuseum} = useMuseumStore(
    useShallow(state => ({
      currentMuseumId: state.currentMuseumId,
      setMuseum: state.setMuseum,
    })),
  )

  const {coords, error: locError} = useUserLocation({
    shouldWatch: true,
    distanceInterval: 25,
  })

  const sortedByDistance: MuseumLocation[] = React.useMemo(() => {
    if (!coords) return []

    const museumsWithDistance = KNOWN_MUSEUMS.map(m => ({
      ...m,
      distance: haversineDistanceMeters(coords, m.coords),
    }))

    const sortedMuseumsWithDistance = museumsWithDistance
      .slice()
      .sort((a, b) => {
        return a.distance - b.distance
      })

    setLoading(false)

    return sortedMuseumsWithDistance
  }, [coords])

  return (
    <Screen.Static>
      <Column
        flex={1}
        padding="md"
        gap="sm">
        <Text.Paragraph>Museum</Text.Paragraph>

        {!!loading && <ActivityIndicator />}

        {!!locError && <Text.Label>{locError}</Text.Label>}

        <FlatList
          data={sortedByDistance}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <PressableBase onPress={() => setMuseum(item.id)}>
              <Text.Paragraph
                fontFamily={currentMuseumId === item.id ? 'bold' : 'regular'}>
                {item.name} ({item.distance?.toFixed(0) ?? '???'} m)
              </Text.Paragraph>
            </PressableBase>
          )}
        />
      </Column>
    </Screen.Static>
  )
}
