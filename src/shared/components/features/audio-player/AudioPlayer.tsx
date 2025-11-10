import {Button, Text} from '@react-navigation/elements'
import React, {useState} from 'react'
import {ActivityIndicator, View} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

/**
 * AudioPlayer
 * TODO: describe what it does.
 *
 * @param {*} options
 * @returns {*} describe return value
 */
export function AudioPlayer({src}: {src: string}) {
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)

  /**
   * toggle
   * TODO: describe what it does.
   *
   * @returns {*} describe return value
   */
  const toggle = async () => {
    setLoading(true)
    // Stub: in future integrate expo-av
    setTimeout(() => {
      setPlaying(p => !p)
      setLoading(false)
    }, 300)
  }

  return (
    <View style={styles.container}>
      <Text selectable>{src}</Text>
      <Button
        onPress={toggle}
        disabled={loading}>
        {playing ? 'Pause' : 'Play'}
      </Button>
      {!!loading && <ActivityIndicator />}
    </View>
  )
}

const styles = StyleSheet.create(() => ({
  container: {gap: 8},
}))
