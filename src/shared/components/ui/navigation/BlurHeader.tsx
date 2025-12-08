import React from 'react'
import {Platform, TouchableOpacity} from 'react-native'
import {StyleSheet, useUnistyles} from 'react-native-unistyles'

import {
  NativeStackHeaderProps,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'

import {BlurBox} from '../layout/BlurBox'
import {Box} from '../layout/Box'
import {Title} from '../typography/Title'

/**
 * BlurHeaderProps
 * Props for the BlurHeader component extending standard NativeStackHeaderProps
 */
export type BlurHeaderProps = NativeStackHeaderProps & {
  /**
   * intensity
   * The intensity of the blur effect (0-100). Defaults to 80
   */
  intensity?: number
}

/**
 * BlurHeader
 * Custom header component with blur effect for glassmorphism design.
 * Uses expo-blur's BlurView as background with platform-adaptive tinting.
 * Supports back button, title, and right action buttons.
 *
 * @param props - Header props including navigation, options, and intensity
 * @returns BlurHeader component with blur effect
 */
export const BlurHeader = ({
  navigation,
  options,
  route,
  back,
  intensity = 80,
}: BlurHeaderProps): React.JSX.Element => {
  const {theme} = useUnistyles()
  const isDark = theme.name === 'dark'

  const title =
    typeof options.headerTitle === 'string'
      ? options.headerTitle
      : options.title ?? route.name

  return (
    <BlurBox
      tint={isDark ? 'dark' : 'light'}
      intensity={intensity}
      style={styles.container}>
      <Box style={styles.content}>
        {/* Left side - Back button */}
        {!!back && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.leftButton}>
            <Title style={{color: theme.color.text.link}}>{'<'} Back</Title>
          </TouchableOpacity>
        )}

        {/* Center - Title */}
        <Box style={styles.titleContainer}>
          <Title
            numberOfLines={1}
            style={{color: theme.color.text.default}}>
            {title}
          </Title>
        </Box>

        {/* Right side - Custom right component */}
        {!!options.headerRight && (
          <Box style={styles.rightButton}>{options.headerRight({})}</Box>
        )}
      </Box>

      <Box style={styles.border} />
    </BlurBox>
  )
}

/**
 * getBlurHeaderOptions
 * Returns navigation options to enable the BlurHeader component.
 * Use this helper to configure screens with a blurred header.
 *
 * @param intensity - Optional blur intensity (0-100). Defaults to 80
 * @returns NativeStackNavigationOptions with custom blur header
 *
 * @example
 * ```tsx
 * <Stack.Screen
 *   name="MyScreen"
 *   component={MyScreen}
 *   options={getBlurHeaderOptions(90)}
 * />
 * ```
 */
export const getBlurHeaderOptions = (
  intensity?: number,
): NativeStackNavigationOptions => ({
  headerShown: true,
  headerTransparent: true,
  header: props => (
    <BlurHeader
      {...props}
      intensity={intensity}
    />
  ),
})

const styles = StyleSheet.create(theme => ({
  container: {
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
  },
  leftButton: {
    marginRight: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightButton: {
    marginLeft: 8,
  },
  border: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.color.border.default,
  },
}))
