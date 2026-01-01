import type {ReactNode} from 'react'
import type {ScrollViewProps, ViewStyle} from 'react-native'

import type {NavigationInset} from '@/shared/hooks/useNavigationInsets'
import type {TestProps} from '@/shared/types/TestProps'

/**
 * Base props shared by all Screen variants.
 */
type BaseScreenProps = TestProps<'Screen'> & {
  /**
   * Child elements to render within the screen.
   */
  children: ReactNode
  /**
   * Optional setting to include or exclude navigation paddings in screen.
   */
  includeNavigationPadding?: false | NavigationInset
  /**
   * Optional style to apply to the screen container.
   */
  style?: ViewStyle
}

/**
 * Configuration options for keyboard avoiding behavior.
 */
type KeyboardAvoidingConfig = {
  /**
   * Whether to add padding when the keyboard is visible.
   * @default false
   */
  keyboardAvoiding?: boolean
  /**
   * Additional padding to add beyond the keyboard height (useful for buttons or bottom-fixed elements).
   * @default 0
   */
  extraPadding?: number
  /**
   * Whether to animate the padding changes when the keyboard appears/disappears.
   * When true, uses smooth animations. When false, padding changes instantly.
   * @default true
   */
  animated?: boolean
}

/**
 * Props for the Static screen variant.
 */
export type StaticScreenProps = BaseScreenProps & KeyboardAvoidingConfig

/**
 * Props for the Scrollable screen variant.
 */
export type ScrollableScreenProps = {
  /**
   * Style to apply to the ScrollView's content container.
   */
  contentContainerStyle?: ViewStyle
  /**
   * Whether to show the vertical scroll indicator.
   * @default false
   */
  showsVerticalScrollIndicator?: boolean
  /**
   * Additional ScrollView props (excludes style and contentContainerStyle which are handled separately).
   */
  scrollViewProps?: Omit<ScrollViewProps, 'style' | 'contentContainerStyle'>
} & BaseScreenProps &
  KeyboardAvoidingConfig
