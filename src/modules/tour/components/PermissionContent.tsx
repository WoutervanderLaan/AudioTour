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
  /**
   * Test ID for the component
   */
  testId?: string
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
  testId = 'PermissionContent',
}: PermissionContentProps): React.JSX.Element => {
  return (
    <Column
      gap="md"
      centerX
      testId={`${testId}ContainerView`}>
      <MaterialIcons
        name={content.icon}
        size={80}
        color={styles.icon.color}
      />

      <Spacer testId={`${testId}SpacerView`} />

      <Text.Title
        align="center"
        testId={`${testId}TitleText`}>
        {content.title}
      </Text.Title>

      <Text.Paragraph
        color="secondary"
        align="center"
        testId={`${testId}DescriptionText`}>
        {content.description}
      </Text.Paragraph>

      <Column
        gap="sm"
        testId={`${testId}BenefitsView`}>
        {content.benefits.map((benefit, index) => (
          <PermissionBenefit
            key={`${benefit.icon}-${benefit.title}`}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
            testId={`${testId}Benefit${index + 1}`}
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
