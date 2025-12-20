import React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {Text} from '@/shared/components/ui/typography'

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
}

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
}: PermissionBenefitProps): React.JSX.Element => {
  return (
    <Column
      gap="xs"
      paddingV="md">
      <Row
        gap="sm"
        stretch
        wrap="wrap"
        centerX>
        <MaterialIcons
          name={icon}
          size={24}
          color={styles.benefitIcon.color}
        />
        <Text.Label>{title}</Text.Label>
      </Row>
      <Text.Label color="secondary">{description}</Text.Label>
    </Column>
  )
}

const styles = StyleSheet.create(theme => ({
  benefitIcon: {
    color: theme.color.text.secondary,
  },
}))
