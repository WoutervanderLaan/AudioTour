import {Capture} from '@/modules/old/screens/Capture'
import {Museum} from '@/modules/old/screens/Museum'
import {Recommendations} from '@/modules/old/screens/Recommendations'
import {ModuleRoute} from '@/shared/types/module'

export const tabs: ModuleRoute[] = [
  {
    name: 'Capture',
    screen: Capture,
    options: {
      title: 'Capture',
    },
  },
  {
    name: 'Museum',
    screen: Museum,
    options: {
      title: 'Museum',
    },
  },
  {
    name: 'Recommendations',
    screen: Recommendations,
    options: {
      title: 'Recommendations',
    },
  },
]
