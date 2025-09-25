import { Button, Text } from "@react-navigation/elements";
import { StaticScreenProps, useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { useApp } from "../../state/AppContext";
import { useApiClient } from "../../state/ApiContext";

type Props = StaticScreenProps<{ objectId: string }>;

export function ObjectDetail({ route }: Props) {
  const { objectId } = route.params;
  const { userSessionId } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [narrative, setNarrative] = useState<string | undefined>(undefined);
  const { api } = useApiClient();

  const generate = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await api.generateNarrative({
        object_id: objectId,
        user_session_id: userSessionId,
      });
      setNarrative(res.narrative_text);
    } catch (e: any) {
      setError(e?.message || "Failed to generate narrative");
    } finally {
      setLoading(false);
    }
  }, [objectId, userSessionId]);

  useFocusEffect(
    useCallback(() => {
      setNarrative(undefined);
      setError(undefined);
      return () => {};
    }, [objectId])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Object Detail</Text>
      <Text>ID: {objectId}</Text>
      <Button onPress={generate} disabled={loading}>
        Generate Narrative
      </Button>
      {loading && <ActivityIndicator />}
      {error && <Text>{error}</Text>}
      {narrative && (
        <View style={styles.card}>
          <Text>{narrative}</Text>
          <Button screen="Narrative" params={{ narrativeText: narrative }}>
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
