import React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import type {PermissionContent as PermissionContentType} from '../utils/permissionContent'
import {PermissionBenefit} from './PermissionBenefit'

import {Column} from '@/shared/components/ui/layout/Column/Column'
import {Spacer} from '@/shared/components/ui/layout/Spacer/Spacer'
import {Text} from '@/shared/components/ui/typography/Text'
import type {TestProps} from '@/shared/types/TestProps'

/**
 * PermissionContentProps
 * Props for the PermissionContent component
 */
export type PermissionContentProps = {
  /**
   * Permission content configuration
   */
  content: PermissionContentType
} & TestProps<'PermissionContent'>

/**
 * PermissionContent
 * Displays the permission request content including icon, title, description, and benefits
 *
 * @param props - Component props
 * @returns Permission content section
 */
export const PermissionContent = ({
  content,
  testID,
}: PermissionContentProps): React.JSX.Element => {
  return (
    <Column
      gap="md"
      centerX
      testID={`${testID}Container`}>
      <MaterialIcons
        name={content.icon}
        size={80}
        color={styles.icon.color}
      />

      <Spacer testID={`${testID}Spacer`} />

      <Text.Title
        align="center"
        testID={`${testID}TitleText`}>
        {content.title}
      </Text.Title>

      <Text.Paragraph
        color="secondary"
        align="center"
        testID={`${testID}DescriptionText`}>
        {content.description}
      </Text.Paragraph>

      <Column
        gap="sm"
        testID={`${testID}BenefitsColumn`}>
        {content.benefits.map((benefit, index) => (
          <PermissionBenefit
            key={`${benefit.icon}-${benefit.title}`}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
            testID={`${testID}${index + 1}PermissionBenefit`}
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
