import type React from 'react'
import type {PropsWithChildren} from 'react'
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context'

import {QueryClientProvider} from '@tanstack/react-query'

import {queryClient} from '@/core/api/queryclient'
import {BannerProvider} from '@/shared/context/banner/BannerContext.provider'
import {KeyboardProvider} from '@/shared/context/keyboard/KeyboardContext.provider'
import {ToastProvider} from '@/shared/context/toast/ToastContext.provider'

/**
 * RootProviders
 * TODO: describe what it does.
 *
 * @param {*} options
 * @returns {*} describe return value
 */
export const RootProviders = ({
  children,
}: PropsWithChildren): React.JSX.Element => {
  return (
    <SystemProviders>
      <CustomProviders>{children}</CustomProviders>
    </SystemProviders>
  )
}

/**
 * SystemProviders
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
const SystemProviders = ({children}: PropsWithChildren): React.JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <KeyboardProvider>{children}</KeyboardProvider>
    </SafeAreaProvider>
  </QueryClientProvider>
)

/**
 * CustomProviders
 * TODO: describe what it does.
 *
 * @param {*} options
 * @returns {*} describe return value
 */
const CustomProviders = ({children}: PropsWithChildren): React.JSX.Element => (
  <ToastProvider>
    <BannerProvider>
      <KeyboardProvider>{children}</KeyboardProvider>
    </BannerProvider>
  </ToastProvider>
)
