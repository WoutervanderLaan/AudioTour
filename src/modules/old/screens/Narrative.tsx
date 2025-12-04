import React, {useState} from 'react'
import {ActivityIndicator, View} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {Button, Text} from '@react-navigation/elements'
import {useMutation} from '@tanstack/react-query'
import {useShallow} from 'zustand/react/shallow'

import {AudioPlayer} from '@/shared/components/features/audio-player/AudioPlayer'
import {apiClient} from '@/core/api/client'
import {GenerateAudioResponse} from '@/core/api/schema'
import {useTourStore} from '@/store/slices/tourStore'

/**
 * Narrative screen component.
 *
 * Displays the AI-generated narrative text for a museum object and allows
 * users to convert it to audio using text-to-speech. The audio can be
 * played directly in the app.
 *
 * @returns The Narrative screen component
 */
export const Narrative = (): React.JSX.Element => {
  const [localError, setLocalError] = useState<string | undefined>(undefined)

  const {audioUrl, setAudioUrl, narrativeText} = useTourStore(
    useShallow(state => ({
      audioUrl: state.audioUrl,
      setAudioUrl: state.setAudioUrl,
      narrativeText: state.narrativeText,
    })),
  )

  const synthesize = useMutation({
    mutationFn: async () => {
      const response = await apiClient.post<GenerateAudioResponse>(
        '/generate-audio',
        {text: narrativeText ?? ''},
      )
      return response.data
    },
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
