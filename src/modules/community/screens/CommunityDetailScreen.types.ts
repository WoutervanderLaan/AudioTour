import type {RouteProp} from '@react-navigation/native'

import {CommunityRouteName, type CommunityStackParams} from '../routes.types'

/**
 * CommunityDetailRouteProp
 * Route prop type for the community detail screen with tourId parameter.
 */
export type CommunityDetailRouteProp = RouteProp<
  CommunityStackParams,
  typeof CommunityRouteName.detail
>
