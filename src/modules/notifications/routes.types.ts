/**
 * NotificationRouteName
 * Route names for notification stack screens
 */
export enum NotificationRouteName {
  settings = 'NotificationSettings',
}

/**
 * NotificationStackParams
 * Parameters for notification stack screens
 */
export type NotificationStackParams = {
  /**
   * Notification settings screen params
   */
  [NotificationRouteName.settings]: undefined
}

/**
 * NotificationModalName
 * Route names for notification modal screens
 */
export enum NotificationModalName {
  permission = 'NotificationPermission',
}

/**
 * NotificationModalParams
 * Parameters for notification modal screens
 */
export type NotificationModalParams = {
  /**
   * Permission request modal params
   */
  [NotificationModalName.permission]: undefined
}
