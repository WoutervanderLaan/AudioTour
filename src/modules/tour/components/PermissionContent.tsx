import React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import type {PermissionContent as PermissionContentType} from '../utils/permissionContent'
import {PermissionBenefit} from './PermissionBenefit'

import {Column} from '@/shared/components/ui/layout/Column'
import {Spacer} from '@/shared/components/ui/layout/Spacer'
import {Text} from '@/shared/components/ui/typography'

/**
 * PermissionContentProps
 * Props for the PermissionContent component
 */
export type PermissionContentProps = {
  /**
   * Permission content configuration
   */
  content: PermissionContentType
}

/**
 * PermissionContent
 * Displays the permission request content including icon, title, description, and benefits
 *
 * @param props - Component props
 * @returns Permission content section
 */
export const PermissionContent = ({
  content,
}: PermissionContentProps): React.JSX.Element => {
  return (
    <Column
      gap="md"
      centerX>
      <MaterialIcons
        name={content.icon}
        size={80}
        color={styles.icon.color}
      />

      <Spacer />

      <Text.Title align="center">{content.title}</Text.Title>

      <Text.Paragraph
        color="secondary"
        align="center">
        {content.description}
      </Text.Paragraph>

      <Column gap="sm">
        {content.benefits.map(benefit => (
          <PermissionBenefit
            key={`${benefit.icon}-${benefit.title}`}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
      </Column>
    </Column>
  )
}

const styles = StyleSheet.create(theme => ({
  icon: {
    color: theme.color.pressable.primary.default.background,
  },
}))
