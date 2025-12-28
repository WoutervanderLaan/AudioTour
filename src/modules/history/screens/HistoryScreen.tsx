import React, {useCallback} from 'react'
import {ActivityIndicator, FlatList, type ListRenderItem} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {HistoryEmptyState} from '../components/HistoryEmptyState'
import {useHistoryTours} from '../hooks/useHistoryTours'
import {HistoryRouteName} from '../routes.types'
import type {TourSummary} from '../types'

import {HistoryTourCard} from '@/modules/history/components/HistoryTourCard'
import {Box} from '@/shared/components/ui/layout/Box'
import {Spacer} from '@/shared/components/ui/layout/Spacer'
import {Screen} from '@/shared/components/ui/screen/Screen'
import {useNavigation} from '@/shared/hooks/useNavigation'
import {useNavigationInsets} from '@/shared/hooks/useNavigationInsets'

/**
 * HistoryScreen
 * Main history interface displaying a list of saved tours.
 * Features search functionality, pull-to-refresh, and navigation to tour details.
 *
 * @returns History screen component
 */
export const HistoryScreen = (): React.JSX.Element => {
  const {navigate} = useNavigation()
  const {top, bottom} = useNavigationInsets(['header', 'tab'])
  const {tours, isLoading, refetch} = useHistoryTours()

  /**
   * handleTourPress
   * Navigates to the tour detail screen.
   *
   * @param tourId - ID of the tour to view
   */
  const handleTourPress = useCallback(
    (tourId: string): void => {
      navigate(HistoryRouteName.detail, {tourId})
    },
    [navigate],
  )

  /**
   * renderItem
   * Memoized render function for FlatList items.
   *
   * @param params - Object containing the tour summary to render
   * @returns Rendered HistoryTourCard component
   */
  const renderItem: ListRenderItem<TourSummary> = useCallback(
    ({item}) => (
      <HistoryTourCard
        tour={item}
        onPress={() => handleTourPress(item.id)}
        testID={`HistoryScreen${item.id}HistoryTourCard`}
      />
    ),
    [handleTourPress],
  )

  /**
   * keyExtractor
   * Memoized key extractor for FlatList items.
   *
   * @param item - Tour summary
   * @returns Unique key for the item
   */
  const keyExtractor = useCallback(
    (item: TourSummary) => item.id + Math.random(),
    [],
  )

  /**
   * ItemSeparatorComponent
   * Memoized separator component between list items.
   *
   * @returns Spacer component
   */
  const ItemSeparatorComponent = useCallback(
    () => (
      <Spacer
        size="sm"
        testID="HistoryScreenItemSpacer"
      />
    ),
    [],
  )

  /**
   * ListEmptyComponent
   * Renders empty state or loading indicator.
   *
   * @returns Empty state or loading component
   */
  const ListEmptyComponent = useCallback(() => {
    if (isLoading) {
      return (
        <Box
          center
          paddingTop="xxl"
          testID="HistoryScreenLoadingBox">
          <ActivityIndicator size="large" />
        </Box>
      )
    }

    return <HistoryEmptyState testID="HistoryScreenHistoryEmptyState" />
  }, [isLoading])

  return (
    <Screen.Static
      includeNavigationPadding={false}
      testID="HistoryScreenScreen">
      <Box
        flex={1}
        testID="HistoryScreenContainer">
        <FlatList
          data={tours}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListEmptyComponent={ListEmptyComponent}
          ItemSeparatorComponent={ItemSeparatorComponent}
          contentContainerStyle={[
            {
              paddingTop: top,
              paddingBottom: bottom,
            },
            styles.container,
          ]}
          refreshing={isLoading}
          onRefresh={refetch}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          initialNumToRender={5}
          windowSize={5}
          testID="HistoryScreenTourList"
        />
      </Box>
    </Screen.Static>
  )
}

const styles = StyleSheet.create(theme => ({
  container: {
    padding: theme.size.md,
  },
}))
