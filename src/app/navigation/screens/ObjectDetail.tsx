import React from 'react'
import {ActivityIndicator, ScrollView, View} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {Button, Text} from '@react-navigation/elements'
import {StaticScreenProps} from '@react-navigation/native'
import {useMutation} from '@tanstack/react-query'
import {useShallow} from 'zustand/react/shallow'

import {useApi} from '@/shared/lib/api/useApi'
import {useTourStore} from '@/store/slices/tourStore'
import {useUserSessionStore} from '@/store/slices/userSessionStore'

/**
 * Props
 * TODO: describe what this type represents.
 */
type Props = StaticScreenProps<{objectId: string}>

/**
 * ObjectDetail
 * TODO: describe what it does.
 *
 * @param {*} options
 * @returns {*} describe return value
 */
export const ObjectDetail = ({route}: Readonly<Props>): React.JSX.Element => {
  const {objectId} = route.params
  const api = useApi()
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
    mutationFn: async () =>
      api.generateNarrative({
        object_id: objectId,
        user_session_id: sessionId,
      }),
    onSuccess: data => {
      console.log('Generated narrative: ', data.text)
      setNarrativeText(data.text)
    },
    onError: err => {
      console.error('Error generating narrative: ', err)
      setLocalError('Error generating narrative')
    },
  })

  // useFocusEffect(
  //   useCallback(() => {
  //     // handled in store if needed
  //     return () => {};
  //   }, [objectId])
  // );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Object Detail</Text>

      <Text>ID: {objectId}</Text>

      <Button
        onPress={() => {
          setLocalError(undefined)
          generate.mutate()
        }}
        disabled={generate.isPending}>
        Generate Narrative
      </Button>

      {!!generate.isPending && <ActivityIndicator />}

      {!!localError && <Text>{localError}</Text>}

      {!!narrativeText && (
        <View style={styles.card}>
          <Text>{narrativeText}</Text>
          <Button screen="Narrative">Listen as Audio</Button>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create(() => ({
  container: {
    padding: 16,
    gap: 12,
  },
  card: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
}))
