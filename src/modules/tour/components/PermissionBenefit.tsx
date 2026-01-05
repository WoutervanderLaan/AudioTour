import React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import type {PermissionBenefitProps} from './PermissionBenefit.types'

import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {Text} from '@/shared/components/ui/typography/Text'

/**
 * PermissionBenefit
 * Displays a single permission benefit with icon and description.
 *
 * @param props - Component props
 * @returns Rendered benefit item
 */
export const PermissionBenefit = ({
  icon,
  title,
  description,
  testID = 'PermissionBenefit',
}: PermissionBenefitProps): React.JSX.Element => {
  return (
    <Column
      gap="xs"
      paddingV="md"
      testID={`${testID}Container`}>
      <Row
        gap="sm"
        stretch
        wrap="wrap"
        centerX
        testID={`${testID}TitleRow`}>
        <MaterialIcons
          name={icon}
          size={24}
          color={styles.benefitIcon.color}
        />
        <Text.Label testID={`${testID}TitleText`}>{title}</Text.Label>
      </Row>
      <Text.Label
        color="secondary"
        testID={`${testID}DescriptionText`}>
        {description}
      </Text.Label>
    </Column>
  )
}

const styles = StyleSheet.create(theme => ({
  benefitIcon: {
    color: theme.color.text.secondary,
  },
}))
