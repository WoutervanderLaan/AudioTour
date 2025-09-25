import { Text } from "@react-navigation/elements";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useApp } from "../../state/AppContext";
import { useApiClient } from "../../state/ApiContext";

export function Recommendations() {
  const { userSessionId, currentMuseumId } = useApp();
  const [items, setItems] = useState<
    Array<{ object_id: string; score?: number }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { api } = useApiClient();

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(undefined);
      try {
        const data = await api.recommendations({
          user_session_id: userSessionId,
          current_museum_id: currentMuseumId,
        });
        setItems(data);
      } catch (e: any) {
        setError(e?.message || "Failed to load recommendations");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [userSessionId, currentMuseumId]);

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
