import type React from 'react'
import {useMemo} from 'react'
import {StyleSheet} from 'react-native-unistyles'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import type {StickyBannerProps} from './StickyBanner.types'

import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {NavItem} from '@/shared/components/ui/navigation/NavItem'
import {IconButton} from '@/shared/components/ui/pressable/IconButton'
import {Text} from '@/shared/components/ui/typography/Text'

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
      gap="md"
      padding="md"
      testID={`${testID}Container`}
      style={styles.banner(variant)}>
      <Row
        testID={`${testID}ContentRow`}
        gap="smd"
        alignItems="flex-start">
        <MaterialIcons
          name={iconName}
          size={20}
          style={styles.text(variant)}
        />
        <Column
          testID={`${testID}TextColumn`}
          gap="xs"
          flex={1}>
          <Text.Title
            level="h5"
            style={styles.text(variant)}
            fontFamily="headingSemiBold"
            testID={`${testID}TitleText`}>
            {title}
          </Text.Title>
          {!!message && (
            <Text.Paragraph
              style={styles.text(variant)}
              testID={`${testID}MessageText`}
              variant="small">
              {message}
            </Text.Paragraph>
          )}
        </Column>
        {!!onDismiss && (
          <IconButton
            testID={`${testID}DismissIconButton`}
            name="close"
            size="sm"
            color={styles.text(variant).color}
            onPress={handleDismiss}
            accessibilityLabel="Dismiss banner"
          />
        )}
      </Row>
      {!!ctaLabel && !!onCtaPress && (
        <NavItem
          testID={`${testID}CtaNavItem`}
          label="Get Started"
          onPress={handleCtaPress}
        />
      )}
    </Column>
  )
}

const styles = StyleSheet.create(theme => ({
  banner: (
    variant: StickyBannerProps['variant'] = 'info',
  ): Record<string, string> => ({
    backgroundColor: theme.color.banner[variant].background,
  }),
  text: (
    variant: StickyBannerProps['variant'] = 'info',
  ): Record<'color', string> => ({
    color: theme.color.banner[variant].text,
  }),
}))
