import React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import {MaterialIcons} from '@expo/vector-icons'

import {Box} from '@/shared/components/ui/layout/Box/Box'
import {Column} from '@/shared/components/ui/layout/Column/Column'
import {Text} from '@/shared/components/ui/typography/Text'
import type {TestProps} from '@/shared/types/TestProps'

/**
 * CommunityEmptyStateProps
 * Props for the CommunityEmptyState component.
 */
type CommunityEmptyStateProps = TestProps<'CommunityEmptyState'>

/**
 * CommunityEmptyState
 * Empty state component displayed when no community tours are found.
 *
 * @param props - Component props
 * @returns Empty state component
 */
export const CommunityEmptyState = ({
  testID,
}: CommunityEmptyStateProps): React.JSX.Element => (
  <Box
    center
    paddingV="xxl"
    testID={`${testID}Box`}>
    <Column
      alignItems="center"
      gap="md"
      testID={`${testID}Column`}>
      <MaterialIcons
        name="explore"
        size={64}
        color={styles.icon.color}
        testID={`${testID}Icon`}
      />

      <Text.Title
        level="h3"
        testID={`${testID}TitleText`}>
        No Tours Found
      </Text.Title>

      <Text.Paragraph
        color="secondary"
        align="center"
        testID={`${testID}DescriptionText`}>
        No community tours match your search criteria. Try adjusting your
        filters or explore different categories.
      </Text.Paragraph>
    </Column>
  </Box>
)

const styles = StyleSheet.create(theme => ({
  icon: {
    color: theme.color.text.secondary,
  },
}))
