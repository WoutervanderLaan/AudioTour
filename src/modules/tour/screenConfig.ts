import {TourCameraPermissionScreen} from './screens/TourCameraPermissionScreen'
import {TourFeedScreen} from './screens/TourFeedScreen'
import {TourHomeScreen} from './screens/TourHomeScreen'
import {TourObjectDetailScreen} from './screens/TourObjectDetailScreen'
import {TourPhotoSubmitScreen} from './screens/TourPhotoSubmitScreen'

import {
  StackNavigationRoutes,
  TabNavigationRoutes,
} from '@/core/navigation/types'
import {
  TourModalName,
  TourModalParams,
  TourRouteName,
  TourStackParams,
  TourTabName,
  TourTabParams,
} from '@/modules/tour/routes.types'

/**
 * Tour stack screen configurations
 */
export const tourStacks: StackNavigationRoutes<TourStackParams, TourRouteName> =
  {
    [TourRouteName.feed]: {
      component: TourFeedScreen,
      name: TourRouteName.feed,
      options: {
        headerShown: true,
        headerTitle: 'Tour',
      },
    },
    [TourRouteName.objectDetail]: {
      component: TourObjectDetailScreen,
      name: TourRouteName.objectDetail,
      options: {
        headerShown: true,
        headerTitle: 'Object Details',
      },
    },
  }

/**
 * Tour tab screen configurations
 */
export const tourTabs: TabNavigationRoutes<TourTabParams, TourTabName> = {
  [TourTabName.home]: {
    component: TourHomeScreen,
    name: TourTabName.home,
    icon: 'museum',
    options: {
      headerShown: true,
      headerTitle: 'AudioTour',
    },
  },
}

/**
 * Tour modal screen configurations
 */
export const tourModals: StackNavigationRoutes<TourModalParams, TourModalName> =
  {
    [TourModalName.photoSubmit]: {
      component: TourPhotoSubmitScreen,
      name: TourModalName.photoSubmit,
      options: {
        headerShown: true,
        headerTitle: 'Submit Photos',
      },
    },
    [TourModalName.cameraPermission]: {
      component: TourCameraPermissionScreen,
      name: TourModalName.cameraPermission,
      options: {
        headerShown: true,
        headerTitle: 'Permission Required',
      },
    },
  }
