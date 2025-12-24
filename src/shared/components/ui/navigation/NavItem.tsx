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
import type {TestProps} from '@/shared/types/test'

/**
 * NavItemProps
 * Props for the NavItem component
 */
export type NavItemProps = Omit<
  PressableBaseProps,
  'children' | 'style' | 'testId'
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
  testId,
  ...rest
}: NavItemProps): React.JSX.Element => {
  return (
    <PressableBase
      testId={`${testId}Pressable` as `${string}Pressable`}
      disabled={disabled}
      style={({pressed}) => [styles.container({pressed, disabled: !!disabled})]}
      {...rest}>
      <Row
        testId={`${testId}ContainerRowView` as `${string}View`}
        justifyContent="space-between"
        padding="md">
        <Row
          testId={`${testId}ContentRowView` as `${string}View`}
          gap="md"
          centerX>
          {!!icon && (
            <MaterialIcons
              name={icon}
              size={24}
              color={styles.icon.color}
            />
          )}
          <Text.Paragraph testId={`${testId}LabelText` as `${string}Text`} variant="small">{label}</Text.Paragraph>
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
    opacity: state.disabled ? theme.opacity.disabled : theme.opacity.none,
  }),
  icon: {
    color: theme.color.text.default,
  },
}))
