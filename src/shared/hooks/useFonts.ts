import {useEffect, useState} from 'react'

import {
  Lora_400Regular,
  Lora_600SemiBold,
  Lora_700Bold,
} from '@expo-google-fonts/lora'
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_800ExtraBold,
  PlayfairDisplay_900Black,
} from '@expo-google-fonts/playfair-display'
import * as Font from 'expo-font'

/**
 * Font configuration mapping font family names to their font assets
 */
export const fonts = {
  'Lora-Regular': Lora_400Regular,
  'Lora-SemiBold': Lora_600SemiBold,
  'Lora-Bold': Lora_700Bold,
  'PlayfairDisplay-Regular': PlayfairDisplay_400Regular,
  'PlayfairDisplay-SemiBold': PlayfairDisplay_600SemiBold,
  'PlayfairDisplay-Bold': PlayfairDisplay_800ExtraBold,
  'PlayfairDisplay-Black': PlayfairDisplay_900Black,
}

/**
 * UseFontsResult
 * Return type for the useFonts hook
 */
export type UseFontsResult = {
  /**
   * fontsLoaded - Whether all fonts have been loaded
   */
  fontsLoaded: boolean
  /**
   * fontError - Error that occurred during font loading, if any
   */
  fontError: Error | null
}

/**
 * useFonts
 * Hook to load custom fonts for the application.
 * Loads Playfair Display for titles/headings and Lora for body text.
 *
 * @returns {UseFontsResult} Object containing fontsLoaded status and fontError
 */
export const useFonts = (): UseFontsResult => {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [fontError, setFontError] = useState<Error | null>(null)

  useEffect(() => {
    /**
     * loadFonts
     * Asynchronously loads all custom fonts
     *
     * @returns Promise that resolves when fonts are loaded
     */
    const loadFonts = async (): Promise<void> => {
      try {
        await Font.loadAsync(fonts)
      } catch (error) {
        setFontError(error as Error)
      } finally {
        setFontsLoaded(true)
      }
    }

    loadFonts()
  }, [])

  return {fontsLoaded, fontError}
}
