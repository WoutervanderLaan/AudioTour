import React, {useState} from 'react'
import {ActivityIndicator} from 'react-native'

import {Button} from '@react-navigation/elements'

import {Column} from '@/shared/components/ui/layout/Column'
import {Text} from '@/shared/components/ui/typography'

/**
 * AudioPlayer
 * Component that provides audio playback controls for narrative audio tracks with play/pause functionality.
 *
 * @param props - Component props with audio source URL
 * @returns Audio player component with controls
 */
export const AudioPlayer = ({src}: {src: string}): React.JSX.Element => {
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)

  /**
   * toggle
   * Toggles audio playback between play and pause states (stub implementation).
   *
   * @returns void
   */
  const toggle = (): void => {
    setLoading(true)
    // Stub: in future integrate expo-av
    setTimeout(() => {
      setPlaying(p => !p)
      setLoading(false)
    }, 300)
  }

  return (
    <Column gap="sm">
      <Text.Label>{src}</Text.Label>

      <Button onPress={toggle}>{playing ? 'Pause' : 'Play'}</Button>

      {!!loading && <ActivityIndicator />}
    </Column>
  )
}
