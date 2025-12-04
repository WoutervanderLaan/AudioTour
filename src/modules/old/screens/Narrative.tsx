import React, {useState} from 'react'
import {ActivityIndicator} from 'react-native'

import {Button, Text} from '@react-navigation/elements'
import {useMutation} from '@tanstack/react-query'
import {useShallow} from 'zustand/react/shallow'

import {AudioPlayer} from '@/shared/components/features/audio-player/AudioPlayer'
import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {useApi} from '@/shared/hooks/useApi'
import {useTourStore} from '@/store/slices/tourStore'

/**
 * Narrative
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const Narrative = (): React.JSX.Element => {
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
    mutationFn: () => api.generateAudio({text: narrativeText ?? ''}),
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
      <Box
        flex={1}
        padding="md"
        gap="sm">
        <Text>No narrative available</Text>
      </Box>
    )
  }

  return (
    <Column
      flex={1}
      padding="md"
      gap="sm">
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
    </Column>
  )
}
