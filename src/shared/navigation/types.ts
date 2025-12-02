import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import type {CompositeScreenProps} from '@react-navigation/native'
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs'

/**
 * Root stack parameter list - defines all screens accessible from the root navigator
 */
export type RootStackParamList = {
  // Main tabs navigator
  HomeTabs: undefined

  // Old module screens (modal/detail screens)
  ObjectDetail: {id: string}
  Narrative: {id: string}
  Settings: undefined
  NotFound: undefined

  // Auth module screens
  Login: undefined
  Register: undefined
}

/**
 * Home tabs parameter list - defines all tabs in the bottom tab navigator
 */
export type HomeTabsParamList = {
  Capture: undefined
  Museum: undefined
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
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface RootParamList extends RootStackParamList {}
  }
}
