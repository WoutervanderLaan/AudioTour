/**
 * Enumeration of module slugs used for module identification in the app.
 *
 * These slugs are used by the ModuleRegistry system to uniquely identify
 * feature modules throughout the application. Each slug corresponds to a
 * specific module in the src/modules/ directory and is used for navigation,
 * routing, and module configuration.
 */
export enum ModuleSlug {
  auth = 'auth',
  community = 'community',
  history = 'history',
  old = 'old',
  profile = 'profile',
  onboarding = 'onboarding',
  tour = 'tour',
  notifications = 'notifications',
}
