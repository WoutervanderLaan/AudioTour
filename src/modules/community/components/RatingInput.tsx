import React, {useCallback, useState} from 'react'
import {ActivityIndicator} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {MaterialIcons} from '@expo/vector-icons'

import {useRateTour} from '../api/mutations'
import {useUserTourRatingQuery} from '../api/queries'

import {Row} from '@/shared/components/ui/layout/Row'
import {PressableBase} from '@/shared/components/ui/pressable/PressableBase'
import {Text} from '@/shared/components/ui/typography/Text'
import type {TestProps} from '@/shared/types/TestProps'

/**
 * RatingInputProps
 * Props for the RatingInput component.
 */
type RatingInputProps = TestProps<'RatingInput'> & {
  /**
   * ID of the tour to rate
   */
  tourId: string
  /**
   * Callback when rating is submitted
   */
  onRated?: () => void
}

/**
 * STAR_SIZE
 * Size of the star icons in the rating input.
 */
const STAR_SIZE = 32

/**
 * STAR_COLOR
 * Color for filled star icons.
 */
const STAR_COLOR = '#FFB800'

/**
 * EMPTY_STAR_COLOR
 * Color for empty star icons.
 */
const EMPTY_STAR_COLOR = '#BEBEBE'

/**
 * RatingInput
 * Interactive star rating input component for submitting tour ratings.
 * Displays the user's existing rating if available.
 *
 * @param props - Component props
 * @returns Rating input component
 *
 * @example
 * ```tsx
 * <RatingInput
 *   tourId="tour-123"
 *   onRated={() => console.log('Rated!')}
 * />
 * ```
 */
export const RatingInput = ({
  tourId,
  onRated,
  testID,
}: RatingInputProps): React.JSX.Element => {
  const [hoverRating, setHoverRating] = useState<number | null>(null)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)

  const {data: existingRating} = useUserTourRatingQuery(tourId)
  const {mutateAsync: rateTour, isPending} = useRateTour()

  const currentRating = existingRating?.rating ?? selectedRating ?? 0
  const displayRating = hoverRating ?? currentRating

  /**
   * handleStarPress
   * Submits the rating when a star is pressed.
   *
   * @param rating - Rating value (1-5)
   */
  const handleStarPress = useCallback(
    async (rating: number): Promise<void> => {
      setSelectedRating(rating)

      try {
        await rateTour({tourId, rating})
        onRated?.()
      } catch {
        // Error is handled by the mutation
        setSelectedRating(null)
      }
    },
    [tourId, rateTour, onRated],
  )

  /**
   * handleStarHover
   * Updates the hover state when hovering over a star.
   *
   * @param rating - Rating value being hovered, or null to clear
   */
  const handleStarHover = useCallback((rating: number | null): void => {
    setHoverRating(rating)
  }, [])

  /**
   * getStarIcon
   * Determines the appropriate star icon for a given position.
   *
   * @param position - Star position (1-5)
   * @returns Icon name for the star
   */
  const getStarIcon = (position: number): 'star' | 'star-border' => {
    if (displayRating >= position) {
      return 'star'
    }
    return 'star-border'
  }

  if (isPending) {
    return (
      <Row
        gap="sm"
        alignItems="center"
        testID={`${testID}LoadingRow`}>
        <ActivityIndicator size="small" />
        <Text.Paragraph
          variant="small"
          color="secondary"
          testID={`${testID}LoadingText`}>
          Submitting rating...
        </Text.Paragraph>
      </Row>
    )
  }

  return (
    <Row
      gap="xs"
      alignItems="center"
      testID={`${testID}Row`}>
      {[1, 2, 3, 4, 5].map(position => (
        <PressableBase
          key={position}
          onPress={() => handleStarPress(position)}
          onPressIn={() => handleStarHover(position)}
          onPressOut={() => handleStarHover(null)}
          style={() => [styles.starButton]}
          testID={`${testID}Star${position}Pressable`}>
          <MaterialIcons
            name={getStarIcon(position)}
            size={STAR_SIZE}
            color={displayRating >= position ? STAR_COLOR : EMPTY_STAR_COLOR}
            testID={`${testID}Star${position}Icon`}
          />
        </PressableBase>
      ))}

      {existingRating !== null && existingRating !== undefined && (
        <Text.Paragraph
          variant="small"
          color="secondary"
          testID={`${testID}ExistingRatingText`}>
          Your rating: {existingRating.rating}
        </Text.Paragraph>
      )}
    </Row>
  )
}

const styles = StyleSheet.create(theme => ({
  starButton: {
    padding: theme.size.xs,
  },
}))
