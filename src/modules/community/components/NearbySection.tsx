import React, {useCallback} from 'react'
import {ActivityIndicator, FlatList, type ListRenderItem} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {useNearbyTours} from '../hooks/useNearbyTours'
import type {CommunityTourSummary} from '../types'
import {CommunityTourCard} from './CommunityTourCard'

import {Box} from '@/shared/components/ui/layout/Box/Box'
import {Column} from '@/shared/components/ui/layout/Column/Column'
import {Spacer} from '@/shared/components/ui/layout/Spacer/Spacer'
import {Text} from '@/shared/components/ui/typography/Text'
import type {TestProps} from '@/shared/types/TestProps'

/**
 * NearbySectionProps
 * Props for the NearbySection component.
 */
type NearbySectionProps = TestProps<'NearbySection'> & {
  /**
   * Callback when a tour is pressed
   */
  onTourPress: (tourId: string) => void
}

/**
 * NearbySection
 * Horizontal scrolling section displaying tours near the user's location.
 *
 * @param props - Component props
 * @returns Nearby section component
 */
export const NearbySection = ({
  onTourPress,
  testID,
}: NearbySectionProps): React.JSX.Element => {
  const {tours, isLoading, isEmpty, locationError} = useNearbyTours()

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

  if (locationError !== null) {
    return (
      <Box
        center
        paddingV="lg"
        testID={`${testID}ErrorBox`}>
        <Text.Paragraph
          color="secondary"
          testID={`${testID}ErrorText`}>
          Enable location access to see nearby tours
        </Text.Paragraph>
      </Box>
    )
  }

  if (isEmpty) {
    return (
      <Box
        center
        paddingV="lg"
        paddingH="md"
        testID={`${testID}EmptyBox`}>
        <Text.Paragraph
          align="center"
          color="secondary"
          testID={`${testID}EmptyText`}>
          No tours found nearby
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
          Nearby Tours
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
