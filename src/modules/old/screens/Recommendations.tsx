import React from 'react'
import {ActivityIndicator, FlatList, View} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {Text} from '@react-navigation/elements'
import {useQuery} from '@tanstack/react-query'

import {ToastType} from '@/shared/components/features/toast/Toast'
import {apiClient} from '@/core/api/client'
import {useToast} from '@/shared/hooks/useToast'
import {useMuseumStore} from '@/store/slices/museumStore'
import {useUserSessionStore} from '@/store/slices/userSessionStore'

/**
 * Item
 * TODO: describe what this type represents.
 */
type Item = {
  /**
   * object_id
   */
  object_id: string
  /**
   * score
   */
  score?: number
}

/**
 * Recommendations
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const Recommendations = (): React.JSX.Element => {
  const sessionId = useUserSessionStore(s => s.sessionId)
  const toast = useToast()
  const currentMuseumId = useMuseumStore(s => s.currentMuseumId)

  const {
    data: items = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['recommendations', sessionId, currentMuseumId],
    queryFn: async () => {
      const response = await apiClient.get<Array<Item>>('/recommendations', {
        params: {
          user_session_id: sessionId,
          current_museum_id: currentMuseumId,
        },
      })
      return response.data
    },
    onError: () => {
      toast.showToast({
        message: 'Error loading recommendations',
        type: ToastType.ERROR,
      })
    },
  })

  return (
    <View style={styles.container}>
      <Text>Recommendations</Text>

      {!!loading && <ActivityIndicator />}

      {!!error && <Text>{error.message}</Text>}

      <FlatList
        data={items}
        keyExtractor={item => item.object_id}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text>Object {item.object_id}</Text>

            {item.score != null && <Text>Score: {item.score.toFixed(2)}</Text>}
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create(() => ({
  container: {flex: 1, padding: 16, gap: 12},
  item: {paddingVertical: 8},
}))
