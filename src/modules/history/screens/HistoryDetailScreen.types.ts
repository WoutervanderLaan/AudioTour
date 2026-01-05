import type {RouteProp} from '@react-navigation/native'

import {HistoryRouteName, type HistoryStackParams} from '../routes.types'

/**
 * HistoryDetailRouteProp
 * Route prop type for the history detail screen with tourId parameter.
 */
export type HistoryDetailRouteProp = RouteProp<
  HistoryStackParams,
  typeof HistoryRouteName.detail
>
