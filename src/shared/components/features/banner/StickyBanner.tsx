import type React from 'react'
import {useMemo} from 'react'
import {StyleSheet} from 'react-native-unistyles'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {IconButton} from '@/shared/components/ui/pressable/IconButton'
import {PressableBase} from '@/shared/components/ui/pressable/PressableBase'
import {Text} from '@/shared/components/ui/typography'
import type {TestProps} from '@/shared/types/test'

/**
 * StickyBannerProps
 * Props for the StickyBanner component
 */
export type StickyBannerProps = TestProps<'StickyBanner'> & {
  /**
   * title - Main title text for the banner
   */
  title: string
  /**
   * message - Optional message or description text
   */
  message?: string
  /**
   * ctaLabel - Call-to-action button label
   */
  ctaLabel?: string
  /**
   * onCtaPress - Callback when CTA is pressed
   */
  onCtaPress?: () => void
  /**
   * onDismiss - Optional callback when banner is dismissed
   */
  onDismiss?: () => void
  /**
   * variant - Visual variant of the banner
   */
  variant?: 'info' | 'warning' | 'success'
}

/**
 * StickyBanner
 * A sticky banner component that displays at the top of the screen.
 * Typically used for important notifications, alerts, or calls-to-action.
 *
 * Features:
 * - Dismissible with close button
 * - Optional call-to-action button
 * - Multiple visual variants (info, warning, success)
 * - Theme-based styling
 * - Accessible with proper labels
 *
 * @param {StickyBannerProps} props - Component props
 * @returns {React.JSX.Element} Rendered sticky banner
 */
export const StickyBanner = ({
  title,
  message,
  ctaLabel,
  onCtaPress,
  onDismiss,
  variant = 'info',
  testId,
}: StickyBannerProps): React.JSX.Element => {
  /**
   * handleDismiss
   * Handles dismissing the banner
   */
  const handleDismiss = (): void => {
    onDismiss?.()
  }

  /**
   * handleCtaPress
   * Handles pressing the call-to-action button
   */
  const handleCtaPress = (): void => {
    onCtaPress?.()
  }

  const iconName = useMemo(() => {
    switch (variant) {
      case 'warning':
        return 'warning'
      case 'success':
        return 'check-circle'
      case 'info':
      default:
        return 'info'
    }
  }, [variant])

  return (
    <Column
      testId={`${testId}View` as `${string}View`}
      style={[styles.container, styles[variant]]}>
      <Row
        testId={`${testId}ContentView` as `${string}View`}
        gap="sm"
        centerY>
        <MaterialIcons
          name={iconName}
          size={20}
          style={styles.icon}
        />
        <Column
          testId={`${testId}TextView` as `${string}View`}
          gap="xxs"
          flex={1}>
          <Text.Label testId={`${testId}TitleText` as `${string}Text`}>
            {title}
          </Text.Label>
          {!!message && (
            <Text.Paragraph
              testId={`${testId}MessageText` as `${string}Text`}
              variant="small"
              color="secondary">
              {message}
            </Text.Paragraph>
          )}
        </Column>
        {!!onDismiss && (
          <IconButton
            testId={`${testId}DismissIconButton` as `${string}IconButton`}
            name="close"
            size="sm"
            onPress={handleDismiss}
            accessibilityLabel="Dismiss banner"
          />
        )}
      </Row>
      {!!ctaLabel && !!onCtaPress && (
        <PressableBase
          testId={`${testId}CtaPressable` as `${string}Pressable`}
          onPress={handleCtaPress}
          style={({pressed}) => [
            styles.ctaButton,
            pressed && styles.ctaButtonPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel={ctaLabel}>
          <Text.Label testId={`${testId}CtaText` as `${string}Text`}>
            {ctaLabel}
          </Text.Label>
          <MaterialIcons
            name="chevron-right"
            size={20}
            style={styles.ctaIcon}
          />
        </PressableBase>
      )}
    </Column>
  )
}

const styles = StyleSheet.create(theme => ({
  container: {
    paddingVertical: theme.size.md,
    paddingHorizontal: theme.size.md,
    gap: theme.size.sm,
    borderBottomWidth: theme.size.xxs,
  },
  info: {
    backgroundColor: theme.color.pressable.primary.default.background,
    borderBottomColor: theme.color.pressable.primary.default.border,
  },
  warning: {
    backgroundColor: theme.color.text.warning,
    borderBottomColor: theme.color.text.warning,
  },
  success: {
    backgroundColor: theme.color.pressable.primary.default.background,
    borderBottomColor: theme.color.pressable.primary.default.border,
  },
  icon: {
    color: theme.color.text.default,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.size.xs,
    paddingVertical: theme.size.sm,
    paddingHorizontal: theme.size.md,
    borderRadius: theme.size.sm,
    backgroundColor: theme.color.pressable.secondary.default.background,
    borderWidth: theme.size.xxs,
    borderColor: theme.color.pressable.secondary.default.border,
  },
  ctaButtonPressed: {
    opacity: theme.opacity.pressed,
  },
  ctaIcon: {
    color: theme.color.text.default,
  },
}))
