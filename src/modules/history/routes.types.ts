/**
 * HistoryRouteName
 * Route identifiers for history stack screens
 */
export enum HistoryRouteName {
  list = 'HistoryList',
  detail = 'HistoryDetail',
}

/**
 * HistoryStackParams
 * Parameter definitions for history stack screens
 */
export type HistoryStackParams = {
  /**
   * History list screen - main history interface with tour list
   */
  [HistoryRouteName.list]: undefined
  /**
   * History detail screen - detailed view of a saved tour
   */
  [HistoryRouteName.detail]: {
    /**
     * ID of the tour to display
     */
    tourId: string
  }
}

/**
 * HistoryTabName
 * Route identifiers for history tab screens
 */
export enum HistoryTabName {
  history = 'HistoryTab',
}

/**
 * HistoryTabParams
 * Parameter definitions for history tab screens
 */
export type HistoryTabParams = {
  /**
   * History tab - main entry point for tour history
   */
  [HistoryTabName.history]: undefined
}
