import { Text } from "@react-navigation/elements";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useUserSessionStore } from "../../state/stores/userSessionStore";
import { useMuseumStore } from "../../state/stores/museumStore";
import { useApi } from "../../state/ApiContext";
import { useToast } from "../../state/ToastContext";

type Item = {
  object_id: string;
  score?: number;
};

export function Recommendations() {
  const [items, setItems] = useState<Array<Item>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const sessionId = useUserSessionStore((s) => s.sessionId);
  const api = useApi();
  const toast = useToast();

  const currentMuseumId = useMuseumStore((s) => s.currentMuseumId);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(undefined);

      try {
        const data = await api.recommendations({
          user_session_id: sessionId,
          current_museum_id: currentMuseumId,
        });

        setItems(data);
      } catch (e: any) {
        setError(e?.message || "Failed to load recommendations");
        toast.showToast({
          message: "Error loading recommendations",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [sessionId, currentMuseumId]);

  return (
    <View style={styles.container}>
      <Text>Recommendations</Text>

      {loading && <ActivityIndicator />}

      {error && <Text>{error}</Text>}

      <FlatList
        data={items}
        keyExtractor={(item) => item.object_id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Object {item.object_id}</Text>

            {item.score != null && <Text>Score: {item.score.toFixed(2)}</Text>}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  item: { paddingVertical: 8 },
});
