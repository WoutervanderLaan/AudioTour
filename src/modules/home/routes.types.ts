/**
 * HomeTabName
 * Route identifiers for home tab screens.
 */
export enum HomeTabName {
  home = 'HomeTab',
}

/**
 * HomeTabParams
 * Parameter definitions for home tab screens.
 */
export type HomeTabParams = {
  /**
   * Home tab - default landing screen of the app.
   */
  [HomeTabName.home]: undefined
}

/**
 * HomeStackParams
 * Parameter definitions for home stack screens. Currently empty and reserved
 * for future detail screens added on top of the home tab.
 */
export type HomeStackParams = Record<string, never>

/**
 * HomeModalParams
 * Parameter definitions for home modal screens. Currently empty and reserved
 * for future modal dialogs launched from the home tab.
 */
export type HomeModalParams = Record<string, never>
