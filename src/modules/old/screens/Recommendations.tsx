import React from 'react'
import {ActivityIndicator, FlatList, View} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {Text} from '@react-navigation/elements'
import {useQuery} from '@tanstack/react-query'

import {ToastType} from '@/shared/components/features/toast/Toast'
import {apiClient} from '@/core/api/client'
import {apiKeys} from '@/core/api/keys'
import {RecommendationsResponse} from '@/core/api/schema'
import {useToast} from '@/shared/hooks/useToast'
import {useMuseumStore} from '@/store/slices/museumStore'
import {useUserSessionStore} from '@/store/slices/userSessionStore'

/**
 * Recommendations screen component.
 *
 * Displays personalized museum object recommendations based on the user's
 * session and optionally filtered by current museum. Uses TanStack Query
 * for data fetching with automatic caching and error handling.
 *
 * @returns The Recommendations screen component
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
    queryKey: apiKeys.recommendations.list(sessionId, currentMuseumId),
    queryFn: async () => {
      const response = await apiClient.get<RecommendationsResponse>(
        '/recommendations',
        {
        params: {
          user_session_id: sessionId,
          current_museum_id: currentMuseumId,
        },
      })
      return response.data
    },
    onError: err => {
      console.error('Failed to load recommendations:', err)
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

      {!!error && (
        <Text>
          {error instanceof Error ? error.message : 'Failed to load recommendations'}
        </Text>
      )}

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
