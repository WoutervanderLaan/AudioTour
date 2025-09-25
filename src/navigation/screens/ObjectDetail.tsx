import { Button, Text } from "@react-navigation/elements";
import { StaticScreenProps, useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { useUserSessionStore } from "../../state/stores/userSessionStore";
import { useTourStore } from "../../state/stores/tourStore";
import { useShallow } from "zustand/react/shallow";

type Props = StaticScreenProps<{ objectId: string }>;

export function ObjectDetail({ route }: Props) {
  const { objectId } = route.params;

  const sessionId = useUserSessionStore(useShallow((state) => state.sessionId));

  const { narrativeText, setNarrativeText } = useTourStore(
    useShallow((state) => ({
      narrativeText: state.narrativeText,
      setNarrativeText: state.setNarrativeText,
    }))
  );

  const generate = useCallback(async () => {
    // TODO: fetch data from api
    setNarrativeText("");
  }, [objectId, sessionId, setNarrativeText]);

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

      <Button onPress={generate} disabled={false}>
        Generate Narrative
      </Button>

      {/* {loading && <ActivityIndicator />}

      {error && <Text>{error}</Text>} */}

      {narrativeText && (
        <View style={styles.card}>
          <Text>{narrativeText}</Text>
          <Button screen="Narrative" params={{ narrativeText: narrativeText }}>
            Listen as Audio
          </Button>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  card: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
});
