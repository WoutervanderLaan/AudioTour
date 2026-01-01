import React from 'react'

import type {RouteProp} from '@react-navigation/native'

import {ObjectDetails} from '../components/ObjectDetails'
import {ObjectMetadata} from '../components/ObjectMetadata'
import {ObjectNotFound} from '../components/ObjectNotFound'
import {PhotoGallery} from '../components/PhotoGallery'
import {usePhotoGallery} from '../hooks/usePhotoGallery'
import type {TourRouteName, TourStackParams} from '../routes.types'
import {useFeedItem} from '../store/selectors'

import {Column} from '@/shared/components/ui/layout/Column/Column'
import {Screen} from '@/shared/components/ui/screen/Screen'

/**
 * TourObjectDetailScreenProps
 * Props for the TourObjectDetailScreen
 */
type TourObjectDetailScreenProps = {
  /**
   * Navigation route prop
   */
  route: RouteProp<TourStackParams, TourRouteName.objectDetail>
}

/**
 * TourObjectDetailScreen
 * Detailed view of a captured tour object.
 * Displays photo gallery, metadata, narrative text, and audio player.
 *
 * @param props - Component props
 * @returns Tour object detail screen component
 */
export const TourObjectDetailScreen = ({
  route,
}: TourObjectDetailScreenProps): React.JSX.Element => {
  const {feedItemId} = route.params

  const {activePhotoIndex, setActivePhotoIndex} = usePhotoGallery()

  const feedItem = useFeedItem(feedItemId)

  if (!feedItem) {
    return <ObjectNotFound testID="TourObjectDetailScreenObjectNotFound" />
  }

  return (
    <Screen.Scrollable testID="TourObjectDetailScreen">
      <Column
        gap="lg"
        testID="TourObjectDetailScreenContainer">
        <PhotoGallery
          photos={feedItem.photos}
          activePhotoIndex={activePhotoIndex}
          onPhotoSelect={setActivePhotoIndex}
          testID="TourObjectDetailScreenPhotoGallery"
        />

        <Column
          paddingH="md"
          paddingBottom="xl"
          gap="lg"
          testID="TourObjectDetailScreenContentColumn">
          <ObjectMetadata
            metadata={feedItem.metadata}
            testID="TourObjectDetailScreenObjectMetadata"
          />

          <ObjectDetails
            description={feedItem.metadata?.description}
            recognitionConfidence={feedItem.recognitionConfidence}
            objectId={feedItem.objectId}
            narrativeText={feedItem.narrativeText}
            audioUrl={feedItem.audioUrl}
            status={feedItem.status}
            error={feedItem.error}
            testID="TourObjectDetailScreenObjectDetails"
          />
        </Column>
      </Column>
    </Screen.Scrollable>
  )
}
