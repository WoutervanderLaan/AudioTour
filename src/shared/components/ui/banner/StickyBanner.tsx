import type React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import {Column} from '../layout/Column'
import {Row} from '../layout/Row'
import {PressableBase} from '../pressable/PressableBase'
import {IconButton} from '../pressable/IconButton'
import {Text} from '../typography'

/**
 * StickyBannerProps
 * Props for the StickyBanner component
 */
export type StickyBannerProps = {
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
  /**
   * testID - Test identifier for automated testing
   */
  testID?: string
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
  testID,
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

  return (
    <Column
      testID={testID}
      style={[styles.container, styles[variant]]}>
      <Row
        gap="sm"
        centerY>
        <MaterialIcons
          name={
            variant === 'warning'
              ? 'warning'
              : variant === 'success'
                ? 'check-circle'
                : 'info'
          }
          size={20}
          style={styles.icon}
        />
        <Column
          gap="xxs"
          flex={1}>
          <Text.Label>{title}</Text.Label>
          {!!message && (
            <Text.Paragraph
              variant="small"
              color="secondary">
              {message}
            </Text.Paragraph>
          )}
        </Column>
        {!!onDismiss && (
          <IconButton
            name="close"
            size="sm"
            onPress={handleDismiss}
            accessibilityLabel="Dismiss banner"
          />
        )}
      </Row>
      {!!ctaLabel && !!onCtaPress && (
        <PressableBase
          onPress={handleCtaPress}
          style={({pressed}) => [
            styles.ctaButton,
            pressed && styles.ctaButtonPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel={ctaLabel}>
          <Text.Label>{ctaLabel}</Text.Label>
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
    borderBottomWidth: 1,
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
    color: theme.color.text.primary,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.size.xs,
    paddingVertical: theme.size.sm,
    paddingHorizontal: theme.size.md,
    borderRadius: theme.size.sm,
    backgroundColor: theme.color.pressable.secondary.default.background,
    borderWidth: 1,
    borderColor: theme.color.pressable.secondary.default.border,
  },
  ctaButtonPressed: {
    opacity: 0.7,
  },
  ctaIcon: {
    color: theme.color.text.primary,
  },
}))
