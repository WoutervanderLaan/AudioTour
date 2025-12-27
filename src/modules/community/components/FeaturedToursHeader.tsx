import React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import type {FeaturedSectionType} from '../types'
import {NearbySection} from './NearbySection'
import {RecommendedSection} from './RecommendedSection'

import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {Spacer} from '@/shared/components/ui/layout/Spacer'
import {PressableBase} from '@/shared/components/ui/pressable/PressableBase'
import {Text} from '@/shared/components/ui/typography/Text'
import type {TestProps} from '@/shared/types/TestProps'

/**
 * FeaturedToursHeaderProps
 * Props for the FeaturedToursHeader component.
 */
type FeaturedToursHeaderProps = TestProps<'FeaturedToursHeader'> & {
  /**
   * Currently active section
   */
  activeSection: FeaturedSectionType
  /**
   * Callback when section is changed
   */
  onSectionChange: (section: FeaturedSectionType) => void
  /**
   * Callback when a tour is pressed
   */
  onTourPress: (tourId: string) => void
}

/**
 * FeaturedToursHeader
 * Header component displaying the featured section toggle and content.
 *
 * @param props - Component props
 * @returns Featured tours header component
 */
export const FeaturedToursHeader = ({
  activeSection,
  onSectionChange,
  onTourPress,
  testID,
}: FeaturedToursHeaderProps): React.JSX.Element => (
  <Column
    gap="md"
    testID={`${testID}Column`}>
    <Row
      gap="sm"
      testID={`${testID}ToggleRow`}>
      <PressableBase
        onPress={() => onSectionChange('recommended')}
        style={() => [
          styles.toggleButton,
          activeSection === 'recommended' && styles.toggleButtonActive,
        ]}
        testID={`${testID}RecommendedPressable`}>
        <Text.Label testID={`${testID}RecommendedToggleText`}>
          Recommended
        </Text.Label>
      </PressableBase>
      <PressableBase
        onPress={() => onSectionChange('nearby')}
        style={() => [
          styles.toggleButton,
          activeSection === 'nearby' && styles.toggleButtonActive,
        ]}
        testID={`${testID}NearbyPressable`}>
        <Text.Label testID={`${testID}NearbyToggleText`}>Nearby</Text.Label>
      </PressableBase>
    </Row>
    {activeSection === 'recommended' ? (
      <RecommendedSection
        onTourPress={onTourPress}
        testID={`${testID}RecommendedSection`}
      />
    ) : (
      <NearbySection
        onTourPress={onTourPress}
        testID={`${testID}NearbySection`}
      />
    )}
    <Spacer
      size="md"
      testID={`${testID}SectionSpacer`}
    />
    <Text.Title
      level="h3"
      testID={`${testID}AllToursText`}>
      All Community Tours
    </Text.Title>
    <Spacer
      size="sm"
      testID={`${testID}HeadingSpacer`}
    />
  </Column>
)

const styles = StyleSheet.create(theme => ({
  toggleButton: {
    paddingHorizontal: theme.size.md,
    paddingVertical: theme.size.sm,
    borderRadius: theme.size.lg,
    backgroundColor: theme.color.screen.background.settings,
  },
  toggleButtonActive: {
    backgroundColor: theme.color.pressable.primary.default.background,
  },
}))
