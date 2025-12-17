import React from 'react'
import {FlatList} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {useTourInitialization} from '../hooks/useTourInitialization'
import {TourRouteName} from '../routes.types'

import {FeedItem} from '@/modules/tour/components/FeedItem'
import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {Spacer} from '@/shared/components/ui/layout/Spacer'
import {Button} from '@/shared/components/ui/pressable'
import {Screen} from '@/shared/components/ui/screen'
import {Text} from '@/shared/components/ui/typography'
import {useNavigation} from '@/shared/hooks/useNavigation'
import {useTourStore} from '@/modules/tour/store/useTourStore'

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

  const feedItems = useTourStore(state => state.feedItems)
  const feedLoading = useTourStore(state => state.feedLoading)

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
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <FeedItem
              item={item}
              onPress={() =>
                navigate(TourRouteName.objectDetail, {feedItemId: item.id})
              }
            />
          )}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <Spacer size="md" />}
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
