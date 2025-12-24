import React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {Text} from '@/shared/components/ui/typography'
import type {TestProps} from '@/shared/types/TestProps'

/**
 * PermissionBenefitProps
 * Props for the PermissionBenefit component
 */
export type PermissionBenefitProps = {
  /**
   * Icon name from MaterialIcons
   */
  icon: keyof typeof MaterialIcons.glyphMap
  /**
   * Benefit title
   */
  title: string
  /**
   * Benefit description
   */
  description: string
} & TestProps<'PermissionBenefit'>

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
      testID={`${testID}ContainerColumn`}>
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
