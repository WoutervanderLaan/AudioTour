import type {StateCreator} from 'zustand'

import type {
  AuthModalParams,
  AuthStackParams,
  AuthTabParams,
} from './auth/routes.types'
import type {
  CommunityStackParams,
  CommunityTabParams,
} from './community/routes.types'
import type {HistoryStackParams, HistoryTabParams} from './history/routes.types'
import type {
  NotificationModalParams,
  NotificationStackParams,
} from './notifications/routes.types'
import type {
  OnboardingModalParams,
  OnboardingStackParams,
} from './onboarding/routes.types'
import type {
  ProfileModalParams,
  ProfileStackParams,
  ProfileTabParams,
} from './profile/routes.types'
import type {ModuleSlug} from './slugs'
import type {
  TourModalParams,
  TourStackParams,
  TourTabParams,
} from './tour/routes.types'

import type {
  RootStackParams,
  StackNavigationRoutes,
  TabNavigationRoutes,
} from '@/core/navigation/types'

/**
 * Configuration object for a module in the application.
 * Defines metadata, navigation structure, lifecycle hooks, and integration options.
 */
export type ModuleConfig = {
  // Basic metadata
  /**
   * Unique identifier for the module
   */
  name: ModuleSlug
  /**
   * Semantic version of the module (e.g., "1.0.0")
   */
  version: string
  /**
   * Whether the module is enabled and should be loaded
   */
  enabled: boolean

  // Navigation
  /**
   * Stack screens that appear above tabs in the root navigator.
   * These screens hide the bottom tabs and show a back button.
   * Use for detail screens like ObjectDetail, Narrative, Login, Register, etc.
   */
  stacks?: StackNavigationRoutes<RootStackParams>
  /**
   * Modal screens that appear with modal presentation.
   * Typically used for settings, forms, or full-screen overlays.
   */
  modals?: StackNavigationRoutes<RootStackParams>
  /**
   * Tab screens that appear in the bottom tab navigator.
   * These are the main navigation destinations.
   * Key is the route name, value contains component and options.
   */
  tabs?: TabNavigationRoutes<RootStackParams>

  // Store integration (Zustand)
  /**
   * Optional Zustand store configuration for the module
   */
  store?: {
    create: StateCreator<unknown>
    persist?: boolean
    devtools?: boolean
  }

  // Dependencies
  /**
   * Array of module names that must be registered before this module
   */
  dependencies?: ModuleSlug[]

  // Lifecycle hooks
  /**
   * Called when the module is registered with the module registry
   */
  onRegister?: () => void | Promise<void>
  /**
   * Called when the module is unregistered from the module registry
   */
  onUnregister?: () => void | Promise<void>
  /**
   * Called during app initialization after all modules are registered
   */
  onAppStart?: () => void | Promise<void>

  // TanStack Query integration
  /**
   * Default query options for this module's TanStack Query hooks
   */
  queries?: {
    refetchOnMount?: boolean
    refetchOnWindowFocus?: boolean
    staleTime?: number
  }
}

/**
 * StackParams - Combined type of all module stack screen parameters
 */
export type StackParams = AuthStackParams &
  CommunityStackParams &
  HistoryStackParams &
  NotificationStackParams &
  OnboardingStackParams &
  TourStackParams &
  ProfileStackParams

/**
 * ModalParams - Combined type of all module modal screen parameters
 */
export type ModalParams =
  | AuthModalParams
  | NotificationModalParams
  | OnboardingModalParams
  | TourModalParams
  | ProfileModalParams

/**
 * TabParams - Combined type of all module tab screen parameters
 */
export type TabParams = CommunityTabParams &
  HistoryTabParams &
  AuthTabParams &
  ProfileTabParams &
  TourTabParams
