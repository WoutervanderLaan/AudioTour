import React, {useCallback} from 'react'
import {ActivityIndicator, FlatList, type ListRenderItem} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {useRecommendedTours} from '../hooks/useRecommendedTours'
import type {CommunityTourSummary} from '../types'
import {CommunityTourCard} from './CommunityTourCard'
import type {RecommendedSectionProps} from './RecommendedSection.types'

import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {Spacer} from '@/shared/components/ui/layout/Spacer'
import {Text} from '@/shared/components/ui/typography/Text'

/**
 * RecommendedSection
 * Horizontal scrolling section displaying personalized tour recommendations.
 *
 * @param props - Component props
 * @returns Recommended section component
 */
export const RecommendedSection = ({
  onTourPress,
  testID,
}: RecommendedSectionProps): React.JSX.Element => {
  const {tours, isLoading, isEmpty} = useRecommendedTours()

  /**
   * renderItem
   * Memoized render function for FlatList items.
   *
   * @param params - Object containing the tour summary to render
   * @returns Rendered CommunityTourCard component
   */
  const renderItem: ListRenderItem<CommunityTourSummary> = useCallback(
    ({item}) => (
      <CommunityTourCard
        tour={item}
        onPress={() => onTourPress(item.id)}
        compact
        testID={`${testID}${item.id}CommunityTourCard`}
      />
    ),
    [onTourPress, testID],
  )

  /**
   * keyExtractor
   * Memoized key extractor for FlatList items.
   *
   * @param item - Tour summary
   * @returns Unique key for the item
   */
  const keyExtractor = useCallback((item: CommunityTourSummary) => item.id, [])

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
        testID={`${testID}ItemSpacer`}
      />
    ),
    [testID],
  )

  if (isLoading) {
    return (
      <Box
        center
        paddingV="lg"
        testID={`${testID}LoadingBox`}>
        <ActivityIndicator size="small" />
      </Box>
    )
  }

  if (isEmpty) {
    return (
      <Box
        center
        paddingH="md"
        paddingV="lg"
        testID={`${testID}EmptyBox`}>
        <Text.Paragraph
          align="center"
          color="secondary"
          testID={`${testID}EmptyText`}>
          No recommendations yet. Explore more tours!
        </Text.Paragraph>
      </Box>
    )
  }

  return (
    <Column
      gap="sm"
      testID={`${testID}Column`}>
      <Box
        testID={`${testID}Box`}
        paddingH="md">
        <Text.Title
          level="h4"
          testID={`${testID}HeadingText`}>
          Recommended for You
        </Text.Title>
      </Box>

      <FlatList
        data={tours}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        testID={`${testID}List`}
      />
    </Column>
  )
}

const styles = StyleSheet.create(theme => ({
  listContent: {
    paddingVertical: theme.size.xs,
    paddingHorizontal: theme.size.md,
  },
}))
