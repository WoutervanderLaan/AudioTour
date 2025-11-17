import {Button, Text} from '@react-navigation/elements'
import {useMutation} from '@tanstack/react-query'
import React, {useState} from 'react'
import {ActivityIndicator, View} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'
import {useShallow} from 'zustand/react/shallow'

import {AudioPlayer} from '@/shared/components/features/audio-player/AudioPlayer'
import {useApi} from '@/shared/lib/api/useApi'
import {useTourStore} from '@/store/slices/tourStore'

/**
 * Narrative
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export function Narrative() {
  const [localError, setLocalError] = useState<string | undefined>(undefined)

  const api = useApi()

  const {audioUrl, setAudioUrl, narrativeText} = useTourStore(
    useShallow(state => ({
      audioUrl: state.audioUrl,
      setAudioUrl: state.setAudioUrl,
      narrativeText: state.narrativeText,
    })),
  )

  const synthesize = useMutation({
    mutationFn: async () => api.generateAudio({text: narrativeText ?? ''}),
    onSuccess(data) {
      setAudioUrl(data.audio_url)
    },
    onError(err) {
      console.error('Error generating audio: ', err)
      setLocalError('Error generating audio')
    },
  })

  if (!narrativeText) {
    return (
      <View style={styles.container}>
        <Text>No narrative available</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text>Narrative</Text>

      <Text numberOfLines={8}>{narrativeText}</Text>

      <Button
        onPress={() => {
          setLocalError(undefined)
          synthesize.mutate()
        }}
        disabled={synthesize.isPending}>
        Generate Audio
      </Button>

      {!!synthesize.isPending && <ActivityIndicator />}

      {!!localError && <Text>{localError}</Text>}

      {!!audioUrl && <AudioPlayer src={audioUrl} />}
    </View>
  )
}

const styles = StyleSheet.create(() => ({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
}))
