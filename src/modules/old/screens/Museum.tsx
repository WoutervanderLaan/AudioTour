import React from 'react'
import {ActivityIndicator, FlatList, TouchableOpacity, View} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {Text} from '@react-navigation/elements'
import {useShallow} from 'zustand/react/shallow'

import {KNOWN_MUSEUMS, type MuseumLocation} from '@/shared/constants/museums'
import {
  haversineDistanceMeters,
  useUserLocation,
} from '@/shared/hooks/useUserLocation'
import {useMuseumStore} from '@/store/slices/museumStore'

/**
 * Museum
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const Museum = (): React.JSX.Element => {
  const [loading, setLoading] = React.useState(true)

  const {currentMuseumId, setMuseum} = useMuseumStore(
    useShallow(state => ({
      currentMuseumId: state.currentMuseumId,
      setMuseum: state.setMuseum,
    })),
  )

  // useEffect(() => {
  // setObjects();
  // }, [currentMuseumId]);

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
    <View style={styles.container}>
      <Text>Museum</Text>

      {!!loading && <ActivityIndicator />}

      {!!locError && <Text>{locError}</Text>}

      <FlatList
        data={sortedByDistance}
        keyExtractor={item => item.id}
        contentContainerStyle={{gap: 8}}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => setMuseum(item.id)}>
            <Text
              style={{
                fontWeight: currentMuseumId === item.id ? 'bold' : 'normal',
                flex: 1,
              }}>
              {item.name} ({item.distance?.toFixed(0) ?? '???'} m)
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create(() => ({
  container: {flex: 1, padding: 16, gap: 12},
  row: {flexDirection: 'row', gap: 8, alignItems: 'center'},
}))
