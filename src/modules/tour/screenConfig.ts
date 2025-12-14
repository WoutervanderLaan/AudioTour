import {TourCameraScreen} from './screens/TourCameraScreen'
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
export const tourStacks: StackNavigationRoutes<
  TourStackParams,
  TourRouteName
> = {
  [TourRouteName.home]: {
    component: TourHomeScreen,
    name: TourRouteName.home,
    options: {
      headerShown: true,
      headerTitle: 'AudioTour',
    },
  },
  [TourRouteName.feed]: {
    component: TourFeedScreen,
    name: TourRouteName.feed,
    options: {
      headerShown: true,
      headerTitle: 'Tour',
    },
  },
  [TourRouteName.camera]: {
    component: TourCameraScreen,
    name: TourRouteName.camera,
    options: {
      headerShown: true,
      headerTitle: 'Capture',
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
  [TourTabName.tour]: {
    component: TourHomeScreen,
    name: TourTabName.tour,
    icon: 'musical-notes',
    options: {
      headerShown: false,
    },
  },
}

/**
 * Tour modal screen configurations
 */
export const tourModals: StackNavigationRoutes<
  TourModalParams,
  TourModalName
> = {
  [TourModalName.photoSubmit]: {
    component: TourPhotoSubmitScreen,
    name: TourModalName.photoSubmit,
    options: {
      headerShown: true,
      headerTitle: 'Submit Photos',
      presentation: 'modal',
    },
  },
}
