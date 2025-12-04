import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs'
import type {CompositeScreenProps} from '@react-navigation/native'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'

/**
 * Root stack parameter list - defines all screens accessible from the root navigator
 */
export type RootStackParamList = {
  // Main tabs navigator
  /**
   * HomeTabs
   */
  HomeTabs: undefined

  // Old module screens (modal/detail screens)
  /**
   * ObjectDetail
   */
  ObjectDetail: {id: string}
  /**
   * Narrative
   */
  Narrative: {id: string}
  /**
   * Settings
   */
  Settings: undefined
  /**
   * NotFound
   */
  NotFound: undefined

  // Auth module screens
  /**
   * Login
   */
  Login: undefined
  /**
   * Register
   */
  Register: undefined
}

/**
 * Home tabs parameter list - defines all tabs in the bottom tab navigator
 */
export type HomeTabsParamList = {
  /**
   * Capture
   */
  Capture: undefined
  /**
   * Museum
   */
  Museum: undefined
  /**
   * Recommendations
   */
  Recommendations: undefined
}

/**
 * Root stack screen props helper type
 */
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>

/**
 * Home tabs screen props helper type
 */
export type HomeTabsScreenProps<T extends keyof HomeTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabsParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >

/**
 * Global type declaration for React Navigation
 */
declare global {
  namespace ReactNavigation {
    /**
     * RootParamList
     * TODO: describe what this type represents.
     */
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface RootParamList extends RootStackParamList {}
  }
}
