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
 * Root provider component that wraps the entire application with all necessary context providers.
 * Combines system-level providers (QueryClient, SafeArea, Keyboard) with custom app providers (Toast, Banner).
 *
 * @param props - Component props
 * @param props.children - Child components to be wrapped by providers
 * @returns JSX element with nested provider hierarchy
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
 * System-level providers for core functionality.
 * Provides QueryClient for data fetching, SafeAreaProvider for device insets, and KeyboardProvider for keyboard handling.
 *
 * @param props - Component props
 * @param props.children - Child components to be wrapped by system providers
 * @returns JSX element with system provider hierarchy
 */
const SystemProviders = ({children}: PropsWithChildren): React.JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <KeyboardProvider>{children}</KeyboardProvider>
    </SafeAreaProvider>
  </QueryClientProvider>
)

/**
 * Custom app-specific providers for UI features.
 * Provides ToastProvider for toast notifications, BannerProvider for banner messages, and KeyboardProvider for keyboard context.
 *
 * @param props - Component props
 * @param props.children - Child components to be wrapped by custom providers
 * @returns JSX element with custom provider hierarchy
 */
const CustomProviders = ({children}: PropsWithChildren): React.JSX.Element => (
  <ToastProvider>
    <BannerProvider>
      <KeyboardProvider>{children}</KeyboardProvider>
    </BannerProvider>
  </ToastProvider>
)
