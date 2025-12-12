import type React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import {
  PressableBase,
  type PressableBaseProps,
} from '../pressable/PressableBase'

import type {IconName} from '@/core/navigation/types'
import {Row} from '@/shared/components/ui/layout/Row'
import {Text} from '@/shared/components/ui/typography'

/**
 * NavItemProps
 * Props for the NavItem component
 */
export type NavItemProps = Omit<PressableBaseProps, 'children' | 'style'> & {
  /**
   * label - Text label for the navigation item
   */
  label: string
  /**
   * icon - Optional icon name from MaterialIcons
   */
  icon?: IconName
  /**
   * testID - Test identifier for automated testing
   */
  testID?: string
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
  ...rest
}: NavItemProps): React.JSX.Element => {
  return (
    <PressableBase
      disabled={disabled}
      style={({pressed}) => [styles.container({pressed, disabled: !!disabled})]}
      testID={testID}
      {...rest}>
      <Row
        justifyContent="space-between"
        padding="md">
        <Row
          gap="md"
          centerX>
          {!!icon && (
            <MaterialIcons
              name={icon}
              size={24}
              color={styles.icon.color}
            />
          )}
          <Text.Paragraph variant="small">{label}</Text.Paragraph>
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
  container: (state: {pressed: boolean; disabled: boolean}): object => ({
    backgroundColor: state.pressed
      ? theme.color.pressable.secondary.pressed.background
      : theme.color.pressable.secondary.default.background,
    opacity: state.disabled ? 0.5 : 1,
  }),
  icon: {
    color: theme.color.text.default,
  },
}))
