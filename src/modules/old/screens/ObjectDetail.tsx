import React from 'react'
import {ActivityIndicator} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {StaticScreenProps} from '@react-navigation/native'
import {useMutation} from '@tanstack/react-query'
import {useShallow} from 'zustand/react/shallow'

import {apiClient} from '@/core/api/client'
import {GenerateNarrativeResponse} from '@/core/api/schema'
import {logger} from '@/core/lib/logger'
import {Column} from '@/shared/components/ui/layout/Column'
import {Button} from '@/shared/components/ui/pressable'
import {Screen} from '@/shared/components/ui/screen'
import {Text} from '@/shared/components/ui/typography'
import {useTourStore} from '@/store/slices/tourStore'
import {useUserSessionStore} from '@/store/slices/userSessionStore'

/**
 * Props for the ObjectDetail screen component.
 */
type Props = StaticScreenProps<{objectId: string}>

/**
 * ObjectDetail screen component.
 *
 * Displays details about a specific museum object and allows users to
 * generate an AI-powered narrative description. The generated narrative
 * is stored in the tour store for access across the app.
 *
 * @param {Props} props - Component props containing route with objectId
 * @returns The ObjectDetail screen component
 */
export const ObjectDetail = ({route}: Readonly<Props>): React.JSX.Element => {
  const {objectId} = route.params
  const [localError, setLocalError] = React.useState<string | undefined>(
    undefined,
  )

  const sessionId = useUserSessionStore(useShallow(state => state.sessionId))

  const {narrativeText, setNarrativeText} = useTourStore(
    useShallow(state => ({
      narrativeText: state.narrativeText,
      setNarrativeText: state.setNarrativeText,
    })),
  )

  const generate = useMutation({
    mutationFn: async () => {
      const response = await apiClient.post<GenerateNarrativeResponse>(
        '/generate-narrative',
        {
          object_id: objectId,
          user_session_id: sessionId,
        },
      )
      return response.data
    },
    onSuccess: data => {
      logger.debug('Generated narrative: ', data.text)
      setNarrativeText(data.text)
    },
    onError: err => {
      logger.error('Error generating narrative: ', err)
      setLocalError('Error generating narrative')
    },
  })

  return (
    <Screen.Scrollable contentContainerStyle={styles.container}>
      <Column
        gap="sm"
        flex={1}
        center>
        <Text.Label>ID: {objectId}</Text.Label>

        <Button
          label="Generate Narrative"
          onPress={() => {
            setLocalError(undefined)
            generate.mutate()
          }}
          disabled={generate.isPending}
        />

        {!!generate.isPending && <ActivityIndicator />}

        {!!localError && <Text.Label>{localError}</Text.Label>}

        {!!narrativeText && <Text.Paragraph>{narrativeText}</Text.Paragraph>}
      </Column>
    </Screen.Scrollable>
  )
}

const styles = StyleSheet.create(() => ({
  container: {
    padding: 16,
    gap: 12,
  },
}))
