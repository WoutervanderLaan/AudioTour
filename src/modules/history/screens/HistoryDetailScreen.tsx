import React, {useCallback} from 'react'
import {ActivityIndicator, FlatList, type ListRenderItem} from 'react-native'

import type {RouteProp} from '@react-navigation/native'
import {useRoute} from '@react-navigation/native'

import {HistoryDetailHeader} from '../components/HistoryDetailHeader'
import {HistoryRouteName, type HistoryStackParams} from '../routes.types'

import {useTourById} from '@/modules/history/store/selectors'
import {FeedItem} from '@/modules/tour/components/FeedItem'
import type {FeedItem as FeedItemType} from '@/modules/tour/types'
import {Box} from '@/shared/components/ui/layout/Box/Box'
import {Spacer} from '@/shared/components/ui/layout/Spacer/Spacer'
import {Screen} from '@/shared/components/ui/screen/Screen'
import {useNavigationInsets} from '@/shared/hooks/useNavigationInsets'

/**
 * HistoryDetailRouteProp
 * Route prop type for the history detail screen with tourId parameter.
 */
type HistoryDetailRouteProp = RouteProp<
  HistoryStackParams,
  typeof HistoryRouteName.detail
>

/**
 * noop
 * Empty function for placeholder onPress handlers.
 */
const noop = (): void => {
  // Placeholder for future implementation
}

/**
 * HistoryDetailScreen
 * Displays the full content of a saved tour including metadata and all feed items.
 * Allows viewing artwork details and playing audio for each item.
 *
 * @returns History detail screen component
 */
export const HistoryDetailScreen = (): React.JSX.Element => {
  const route = useRoute<HistoryDetailRouteProp>()
  const {tourId} = route.params
  const tour = useTourById(tourId)
  const {top} = useNavigationInsets(['header'])

  const renderItem: ListRenderItem<FeedItemType> = useCallback(
    ({item}) => (
      <FeedItem
        item={item}
        onPress={noop}
        testID={`HistoryDetailScreen${item.id}FeedItem`}
      />
    ),
    [],
  )

  const keyExtractor = useCallback((item: FeedItemType) => item.id, [])

  const ItemSeparatorComponent = useCallback(
    () => (
      <Spacer
        size="md"
        testID="HistoryDetailScreenItemSpacer"
      />
    ),
    [],
  )

  if (tour === undefined) {
    return (
      <Screen.Static
        testID="HistoryDetailScreenNotFoundScreen"
        includeNavigationPadding={false}>
        <Box
          flex={1}
          center
          testID="HistoryDetailScreenNotFoundBox">
          <ActivityIndicator />
        </Box>
      </Screen.Static>
    )
  }

  return (
    <Screen.Static
      includeNavigationPadding={false}
      testID="HistoryDetailScreenScreen">
      <Box testID="HistoryDetailScreenContainer">
        <FlatList
          data={tour.feedItems}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={<HistoryDetailHeader tour={tour} />}
          ItemSeparatorComponent={ItemSeparatorComponent}
          removeClippedSubviews={true}
          contentContainerStyle={{paddingTop: top, paddingBottom: top}}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          initialNumToRender={5}
          windowSize={5}
          testID="HistoryDetailScreenFeedList"
        />
      </Box>
    </Screen.Static>
  )
}
