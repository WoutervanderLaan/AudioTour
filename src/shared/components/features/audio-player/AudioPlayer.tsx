import React, {useState} from 'react'
import {ActivityIndicator} from 'react-native'

import {Button} from '@react-navigation/elements'

import {Column} from '@/shared/components/ui/layout/Column'
import {Label} from '@/shared/components/ui/typography'

/**
 * AudioPlayer
 * TODO: describe what it does.
 *
 * @param {*} options
 * @returns {*} describe return value
 */
export const AudioPlayer = ({src}: {src: string}): React.JSX.Element => {
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)

  /**
   * toggle
   * TODO: describe what it does.
   *
   * @returns {*} describe return value
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
      <Label>{src}</Label>

      <Button onPress={toggle}>{playing ? 'Pause' : 'Play'}</Button>

      {!!loading && <ActivityIndicator />}
    </Column>
  )
}
