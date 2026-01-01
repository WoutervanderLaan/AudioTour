import React, {useCallback} from 'react'
import {FlatList, type ListRenderItem} from 'react-native'

import {useTourInitialization} from '../hooks/useTourInitialization'
import {TourRouteName} from '../routes.types'

import {AddArtworkButton} from '@/modules/tour/components/AddArtworkButton'
import {FeedItem} from '@/modules/tour/components/FeedItem'
import {useFeedItems, useFeedLoading} from '@/modules/tour/store/selectors'
import type {FeedItem as FeedItemType} from '@/modules/tour/types'
import {Box} from '@/shared/components/ui/layout/Box/Box'
import {Column} from '@/shared/components/ui/layout/Column/Column'
import {Spacer} from '@/shared/components/ui/layout/Spacer/Spacer'
import {Screen} from '@/shared/components/ui/screen/Screen'
import {Text} from '@/shared/components/ui/typography/Text'
import {useNavigation} from '@/shared/hooks/useNavigation'
import {useNavigationInsets} from '@/shared/hooks/useNavigationInsets'

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

  const {top, bottom} = useNavigationInsets(['header', 'tab'])
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
        testID={`TourFeedScreen${item.id}FeedItem`}
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
  const ItemSeparatorComponent = useCallback(
    () => (
      <Spacer
        size="md"
        testID="TourFeedScreenItemSpacer"
      />
    ),
    [],
  )

  return (
    <Screen.Static
      includeNavigationPadding={['tab']}
      testID="TourFeedScreen">
      <Box
        flex={1}
        testID="TourFeedScreenContainer">
        <FlatList
          ListEmptyComponent={
            <Box
              center
              paddingTop="xxl"
              testID="TourFeedScreenEmptyStateBox">
              <Column
                justifyContent="flex-end"
                center
                testID="TourFeedScreenEmptyStateContentColumn">
                {isLoadingTour ? (
                  <Text.Paragraph testID="TourFeedScreenLoadingText">
                    Initializing tour...
                  </Text.Paragraph>
                ) : (
                  <Text.Paragraph testID="TourFeedScreenEmptyText">
                    Add a first Artwork to start the tour
                  </Text.Paragraph>
                )}
              </Column>
            </Box>
          }
          data={feedItems}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingTop: top,
            paddingBottom: bottom,
          }}
          ItemSeparatorComponent={ItemSeparatorComponent}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          initialNumToRender={5}
          windowSize={5}
        />

        <Column
          padding="md"
          paddingBottom="xl"
          testID="TourFeedScreenAddArtworkContainer">
          <AddArtworkButton
            disabled={feedLoading}
            testID="TourFeedScreenAddArtworkButton"
          />
        </Column>
      </Box>
    </Screen.Static>
  )
}
