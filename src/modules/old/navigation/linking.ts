import type {LinkingOptions, ParamListBase} from '@react-navigation/native'
import {createURL} from 'expo-linking'

const prefix = createURL('/')

export const linking: LinkingOptions<ParamListBase> = {
  prefixes: [prefix],
  enabled: true,
}
