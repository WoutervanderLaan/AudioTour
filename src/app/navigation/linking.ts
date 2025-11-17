import type {LinkingOptions} from '@react-navigation/native'
import {createURL} from 'expo-linking'

import type {RootStackParamList} from '.'

const prefix = createURL('/')

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [prefix],
  enabled: true,
}
