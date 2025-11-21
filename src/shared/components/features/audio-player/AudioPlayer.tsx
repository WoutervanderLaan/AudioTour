import React, {useState} from 'react'
import {ActivityIndicator, Text, View} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {Button} from '@/shared/components/ui/Button/Button'

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
    <View style={styles.container}>
      <Text>{src}</Text>
      <Button
        onPress={toggle}
        label={playing ? 'Pause' : 'Play'}
      />

      {!!loading && <ActivityIndicator />}
    </View>
  )
}

const styles = StyleSheet.create(() => ({
  container: {gap: 8},
}))
