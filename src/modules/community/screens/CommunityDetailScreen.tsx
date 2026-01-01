import React, {useCallback} from 'react'
import {ActivityIndicator, FlatList, type ListRenderItem} from 'react-native'

import type {RouteProp} from '@react-navigation/native'
import {useRoute} from '@react-navigation/native'

import {TourDetailHeader} from '../components/TourDetailHeader'
import {useCommunityTourById} from '../hooks/useCommunityTours'
import {CommunityRouteName, type CommunityStackParams} from '../routes.types'

import {FeedItem} from '@/modules/tour/components/FeedItem'
import type {FeedItem as FeedItemType} from '@/modules/tour/types'
import {Box} from '@/shared/components/ui/layout/Box/Box'
import {Spacer} from '@/shared/components/ui/layout/Spacer/Spacer'
import {Screen} from '@/shared/components/ui/screen/Screen'
import {useNavigationInsets} from '@/shared/hooks/useNavigationInsets'

/**
 * CommunityDetailRouteProp
 * Route prop type for the community detail screen with tourId parameter.
 */
type CommunityDetailRouteProp = RouteProp<
  CommunityStackParams,
  typeof CommunityRouteName.detail
>

/**
 * noop
 * Empty function for placeholder handlers.
 */
const noop = (): void => {
  // Placeholder for future implementation
}

/**
 * CommunityDetailScreen
 * Displays the full content of a community tour including metadata,
 * author info, rating, and all feed items. Includes a "Start Tour" button.
 *
 * @returns Community detail screen component
 */
export const CommunityDetailScreen = (): React.JSX.Element => {
  const route = useRoute<CommunityDetailRouteProp>()
  const {tourId} = route.params
  const {tour, isLoading} = useCommunityTourById(tourId)
  const {top} = useNavigationInsets(['header'])

  const handleStartTour = useCallback((): void => {
    // Tour playback navigation will be implemented when connecting to tour module
  }, [])

  const handleRatingSubmit = useCallback((): void => {
    // Rating mutation is handled in RatingInput component
  }, [])

  const renderFeedItem: ListRenderItem<FeedItemType> = useCallback(
    ({item}) => (
      <FeedItem
        item={item}
        onPress={noop}
        testID={`CommunityDetailScreen${item.id}FeedItem`}
      />
    ),
    [],
  )

  const keyExtractor = useCallback((item: FeedItemType) => item.id, [])

  const ItemSeparatorComponent = useCallback(
    () => (
      <Spacer
        size="md"
        testID="CommunityDetailScreenItemSpacer"
      />
    ),
    [],
  )

  /**
   * ListHeaderComponent
   * TODO: describe what it does.
   *
   * @returns {*} describe return value
   */
  const ListHeaderComponent = useCallback((): React.JSX.Element | null => {
    if (!tour) return null
    return (
      <TourDetailHeader
        tour={tour}
        onStartTour={handleStartTour}
        onRated={handleRatingSubmit}
        testID="CommunityDetailScreenTourDetailHeader"
      />
    )
  }, [tour, handleStartTour, handleRatingSubmit])

  if (isLoading || tour === undefined) {
    return (
      <Screen.Static
        testID="CommunityDetailScreenLoadingScreen"
        includeNavigationPadding={false}>
        <Box
          flex={1}
          center
          testID="CommunityDetailScreenLoadingBox">
          <ActivityIndicator size="large" />
        </Box>
      </Screen.Static>
    )
  }

  return (
    <Screen.Static
      includeNavigationPadding={false}
      testID="CommunityDetailScreenScreen">
      <Box testID="CommunityDetailScreenContainer">
        <FlatList
          data={tour.feedItems}
          keyExtractor={keyExtractor}
          renderItem={renderFeedItem}
          ListHeaderComponent={ListHeaderComponent}
          ItemSeparatorComponent={ItemSeparatorComponent}
          removeClippedSubviews={true}
          contentContainerStyle={{paddingTop: top, paddingBottom: top}}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          initialNumToRender={5}
          windowSize={5}
          testID="CommunityDetailScreenFeedList"
        />
      </Box>
    </Screen.Static>
  )
}
