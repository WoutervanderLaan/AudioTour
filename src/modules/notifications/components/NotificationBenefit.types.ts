import {MaterialIcons} from '@expo/vector-icons'

/**
 * NotificationBenefitProps
 * Props for the NotificationBenefit component
 */
export type NotificationBenefitProps = {
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
  /**
   * Test ID for the benefit component
   */
  testID?: string
}
