import type {AppThemes} from '@/themes/types'

declare module '*.png' {
  const value: import('react-native').ImageSourcePropType
  export default value
}

declare module '*.jpg' {
  const value: import('react-native').ImageSourcePropType
  export default value
}

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}
