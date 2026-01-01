import React, {useCallback, useState} from 'react'
import {ActivityIndicator, FlatList, type ListRenderItem} from 'react-native'

import {CommunityEmptyState} from '../components/CommunityEmptyState'
import {CommunityTourCard} from '../components/CommunityTourCard'
import {FeaturedToursHeader} from '../components/FeaturedToursHeader'
import {useCommunityTours} from '../hooks/useCommunityTours'
import {CommunityRouteName} from '../routes.types'
import type {CommunityTourSummary, FeaturedSectionType} from '../types'

import {Box} from '@/shared/components/ui/layout/Box/Box'
import {Spacer} from '@/shared/components/ui/layout/Spacer/Spacer'
import {Screen} from '@/shared/components/ui/screen/Screen'
import {useNavigation} from '@/shared/hooks/useNavigation'
import {useNavigationInsets} from '@/shared/hooks/useNavigationInsets'

/**
 * CommunityScreen
 * Main community browse screen displaying recommendations, nearby tours,
 * and a searchable list of all community tours.
 *
 * @returns Community screen component
 */
export const CommunityScreen = (): React.JSX.Element => {
  const {navigate} = useNavigation()
  const {top, bottom} = useNavigationInsets(['header', 'tab'])
  const [featuredSection, setFeaturedSection] =
    useState<FeaturedSectionType>('recommended')

  const {tours, isLoading, refetch} = useCommunityTours()

  const handleTourPress = useCallback(
    (tourId: string): void => {
      navigate(CommunityRouteName.detail, {tourId})
    },
    [navigate],
  )

  const handleToggleSection = useCallback(
    (section: FeaturedSectionType): void => {
      setFeaturedSection(section)
    },
    [],
  )

  const renderItem: ListRenderItem<CommunityTourSummary> = useCallback(
    ({item}) => (
      <Box
        testID={`CommunityTourCard${item.id}Box`}
        paddingH="md">
        <CommunityTourCard
          tour={item}
          onPress={() => handleTourPress(item.id)}
          testID={`CommunityScreen${item.id}CommunityTourCard`}
        />
      </Box>
    ),
    [handleTourPress],
  )

  const keyExtractor = useCallback((item: CommunityTourSummary) => item.id, [])

  const ItemSeparatorComponent = useCallback(
    () => (
      <Spacer
        size="sm"
        testID="CommunityScreenItemSpacer"
      />
    ),
    [],
  )

  const ListHeaderComponent = useCallback(
    () => (
      <FeaturedToursHeader
        activeSection={featuredSection}
        onSectionChange={handleToggleSection}
        onTourPress={handleTourPress}
        testID="CommunityScreenFeaturedToursHeader"
      />
    ),
    [featuredSection, handleToggleSection, handleTourPress],
  )

  const ListEmptyComponent = useCallback(() => {
    if (isLoading) {
      return (
        <Box
          center
          paddingTop="xxl"
          testID="CommunityScreenLoadingBox">
          <ActivityIndicator size="large" />
        </Box>
      )
    }
    return <CommunityEmptyState testID="CommunityScreenCommunityEmptyState" />
  }, [isLoading])

  return (
    <Screen.Static
      includeNavigationPadding={false}
      testID="CommunityScreenScreen">
      <Box
        flex={1}
        testID="CommunityScreenContainer">
        <FlatList
          data={tours}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={ListHeaderComponent}
          ListEmptyComponent={ListEmptyComponent}
          ItemSeparatorComponent={ItemSeparatorComponent}
          contentContainerStyle={[{paddingTop: top, paddingBottom: bottom}]}
          refreshing={isLoading}
          onRefresh={refetch}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          initialNumToRender={5}
          windowSize={5}
          testID="CommunityScreenTourList"
        />
      </Box>
    </Screen.Static>
  )
}
