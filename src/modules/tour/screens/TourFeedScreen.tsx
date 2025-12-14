import React, {useEffect} from 'react'
import {FlatList, View} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {useTourInitialization} from '../hooks/useTourInitialization'
import {TourRouteName} from '../routes.types'

import {FeedItem} from '@/modules/tour/components/FeedItem'
import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {Button} from '@/shared/components/ui/pressable'
import {Screen} from '@/shared/components/ui/screen'
import {Text} from '@/shared/components/ui/typography'
import {useNavigation} from '@/shared/hooks/useNavigation'
import {useTourStore} from '@/store/slices/tourStore'

/**
 * TourFeedScreen
 * Main tour interface displaying a feed of captured objects.
 * Features a camera button for capturing new objects and displays
 * feed items with loading states and audio players.
 *
 * @returns Tour feed screen component
 */
export const TourFeedScreen = (): React.JSX.Element => {
  const {navigate} = useNavigation()
  const {isLoading: initLoading, nearestMuseum} = useTourInitialization()

  const feedItems = useTourStore(state => state.feedItems)
  const feedLoading = useTourStore(state => state.feedLoading)

  /**
   * handleCameraPress
   * Navigates to the camera screen to capture photos
   *
   * @returns void
   */
  const handleCameraPress = (): void => {
    navigate(TourRouteName.camera, {existingPhotos: []})
  }

  /**
   * handleItemPress
   * Navigates to the detail screen for a feed item
   *
   * @param feedItemId - ID of the feed item to view
   * @returns void
   */
  const handleItemPress = (feedItemId: string): void => {
    navigate(TourRouteName.objectDetail, {feedItemId})
  }

  /**
   * renderEmptyState
   * Renders the empty state when no feed items exist
   *
   * @returns Empty state component
   */
  const renderEmptyState = (): React.JSX.Element => {
    return (
      <Box
        flex={1}
        center
        paddingH="lg">
        <Column
          gap="md"
          center>
          {initLoading ? (
            <Text.Body>Initializing tour...</Text.Body>
          ) : (
            <>
              {nearestMuseum ? (
                <>
                  <Text.H3 style={styles.emptyTitle}>
                    Welcome to {nearestMuseum.name}!
                  </Text.H3>
                  <Text.Body style={styles.emptyText}>
                    Start capturing museum objects to begin your audio tour
                  </Text.Body>
                </>
              ) : (
                <>
                  <Text.H3 style={styles.emptyTitle}>Start Your Tour</Text.H3>
                  <Text.Body style={styles.emptyText}>
                    Capture museum objects to create your personalized audio
                    tour
                  </Text.Body>
                </>
              )}
            </>
          )}
        </Column>
      </Box>
    )
  }

  return (
    <Screen.Default>
      <View style={styles.container}>
        {feedItems.length === 0 ? (
          renderEmptyState()
        ) : (
          <FlatList
            data={feedItems}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <FeedItem
                item={item}
                onPress={() => handleItemPress(item.id)}
              />
            )}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}

        {/* Camera Button */}
        <Box
          paddingH="md"
          paddingV="md"
          style={styles.cameraButtonContainer}>
          <Button
            label="📷 Capture Object"
            onPress={handleCameraPress}
            disabled={feedLoading}
            size="large"
          />
        </Box>
      </View>
    </Screen.Default>
  )
}

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
  },
  listContent: {
    padding: theme.spacing.md,
  },
  separator: {
    height: theme.spacing.md,
  },
  emptyTitle: {
    textAlign: 'center',
    color: theme.colors.text.primary,
  },
  emptyText: {
    textAlign: 'center',
    color: theme.colors.text.secondary,
    maxWidth: 300,
  },
  cameraButtonContainer: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.primary,
    backgroundColor: theme.colors.surface.primary,
  },
}))
