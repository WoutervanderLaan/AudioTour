import {Button, Text} from '@react-navigation/elements'
import React, {useState} from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'

/**
 * function or component toggle
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export /**
 * Function or component AudioPlayer
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
function AudioPlayer({src}: {src: string}) {
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)

  const /**
     * Function or component toggle
     * TODO: describe what it does.
     *
     * @returns {*} describe return value
     */
    toggle =
      /**
       * function or component toggle
       * TODO: describe what it does.
       *
       * @returns {*} describe return value
       */
      async () => {
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

const styles = StyleSheet.create({
  container: {gap: 8},
})
