import React, {useCallback} from 'react'
import {FlatList, type ListRenderItem} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {useTourInitialization} from '../hooks/useTourInitialization'
import {TourRouteName} from '../routes.types'

import {FeedItem} from '@/modules/tour/components/FeedItem'
import type {FeedItem as FeedItemType} from '@/modules/tour/store/useTourStore'
import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {Spacer} from '@/shared/components/ui/layout/Spacer'
import {Button} from '@/shared/components/ui/pressable'
import {Screen} from '@/shared/components/ui/screen'
import {Text} from '@/shared/components/ui/typography'
import {useNavigation} from '@/shared/hooks/useNavigation'
import {useFeedItems, useFeedLoading} from '@/modules/tour/store/selectors'

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
  const {isLoading: isLoadingTour} = useTourInitialization()

  const feedItems = useFeedItems()
  const feedLoading = useFeedLoading()

  /**
   * renderItem
   * Memoized render function for FlatList items.
   * Prevents unnecessary re-renders when parent component updates.
   *
   * @param params - Object containing the feed item to render
   * @returns Rendered FeedItem component
   */
  const renderItem: ListRenderItem<FeedItemType> = useCallback(
    ({item}) => (
      <FeedItem
        item={item}
        onPress={() =>
          navigate(TourRouteName.objectDetail, {feedItemId: item.id})
        }
      />
    ),
    [navigate],
  )

  /**
   * keyExtractor
   * Memoized key extractor for FlatList items.
   *
   * @param item - Feed item
   * @returns Unique key for the item
   */
  const keyExtractor = useCallback((item: FeedItemType) => item.id, [])

  /**
   * ItemSeparatorComponent
   * Memoized separator component between list items.
   *
   * @returns Spacer component
   */
  const ItemSeparatorComponent = useCallback(() => <Spacer size="md" />, [])

  return (
    <Screen.Static>
      <Box flex={1}>
        <FlatList
          ListEmptyComponent={
            <Box
              flex={1}
              center
              paddingH="lg">
              <Column
                gap="md"
                justifyContent="flex-end"
                center>
                {isLoadingTour ? (
                  <Text.Paragraph>Initializing tour...</Text.Paragraph>
                ) : (
                  <Text.Paragraph>
                    Add a first Artwork to start the tour
                  </Text.Paragraph>
                )}
              </Column>
            </Box>
          }
          data={feedItems}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={ItemSeparatorComponent}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          initialNumToRender={5}
          windowSize={5}
        />

        <Column
          padding="md"
          paddingBottom="xl">
          <Button
            label="New Artwork"
            onPress={() => navigate(TourRouteName.camera, {existingPhotos: []})}
            disabled={feedLoading}
          />
        </Column>
      </Box>
    </Screen.Static>
  )
}

const styles = StyleSheet.create(theme => ({
  listContent: {
    padding: theme.size.md,
    flex: 1,
  },
}))
