import type React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import {
  PressableBase,
  type PressableBaseProps,
} from '../pressable/PressableBase'

import type {IconName} from '@/core/navigation/types'
import {Row} from '@/shared/components/ui/layout/Row'
import {Text} from '@/shared/components/ui/typography/Text'
import type {TestProps} from '@/shared/types/TestProps'

/**
 * NavItemProps
 * Props for the NavItem component
 */
export type NavItemProps = Omit<
  PressableBaseProps,
  'children' | 'style' | 'testID'
> &
  TestProps<'NavItem'> & {
    /**
     * label - Text label for the navigation item
     */
    label: string
    /**
     * icon - Optional icon name from MaterialIcons
     */
    icon?: IconName
    /**
     * small - Optional smaller variant
     */
    small?: boolean
  }

/**
 * NavItem
 * A navigation item component typically used in settings or profile screens.
 * Displays a label with an optional icon and right-side content (e.g., chevron, badge).
 *
 * @param {NavItemProps} props - Component props
 * @returns {React.JSX.Element} Rendered navigation item
 */
export const NavItem = ({
  label,
  icon,
  disabled,
  testID,
  small = false,
  ...rest
}: NavItemProps): React.JSX.Element => {
  return (
    <PressableBase
      testID={`${testID}Pressable`}
      disabled={disabled}
      {...rest}>
      <Row
        testID={`${testID}ContainerRow`}
        justifyContent="space-between"
        padding="md"
        style={styles.container}
        paddingV={small ? 'md' : 'sm'}>
        <Row
          testID={`${testID}ContentRow`}
          gap="md"
          centerX>
          {!!icon && (
            <MaterialIcons
              name={icon}
              size={24}
              color={styles.icon.color}
            />
          )}
          <Text.Paragraph
            testID={`${testID}LabelText`}
            variant="small">
            {label}
          </Text.Paragraph>
        </Row>
        <MaterialIcons
          name="chevron-right"
          size={24}
          color={styles.icon.color}
        />
      </Row>
    </PressableBase>
  )
}

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.color.pressable.secondary.default.background,
    ...theme.styles.border.sharp,
  },
  icon: {
    color: theme.color.text.default,
  },
}))
