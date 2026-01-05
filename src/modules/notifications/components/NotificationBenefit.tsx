import type React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import {MaterialIcons} from '@expo/vector-icons'

import type {NotificationBenefitProps} from './NotificationBenefit.types'

import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {Text} from '@/shared/components/ui/typography/Text'

/**
 * NotificationBenefit
 * Displays a single notification benefit with icon and description.
 *
 * @param {NotificationBenefitProps} props - Component props
 * @returns {React.JSX.Element} Rendered benefit item
 */
export const NotificationBenefit = ({
  icon,
  title,
  description,
  testID,
}: NotificationBenefitProps): React.JSX.Element => {
  return (
    <Column
      gap="xs"
      paddingV="sm"
      testID={`${testID}Column`}>
      <Row
        gap="sm"
        testID={`${testID}ContentRow`}>
        <MaterialIcons
          name={icon}
          size={24}
          style={styles.icon}
        />
        <Column
          flex={1}
          gap="xs"
          testID={`${testID}TextContainer`}>
          <Text.Label testID={`${testID}TitleText`}>{title}</Text.Label>
          <Text.Paragraph
            variant="small"
            color="secondary"
            testID={`${testID}DescriptionText`}>
            {description}
          </Text.Paragraph>
        </Column>
      </Row>
    </Column>
  )
}

const styles = StyleSheet.create(theme => ({
  icon: {
    color: theme.color.text.secondary,
  },
}))
