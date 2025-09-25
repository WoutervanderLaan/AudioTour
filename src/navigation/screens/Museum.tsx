import { Button, Text } from "@react-navigation/elements";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useApp } from "../../state/AppContext";
import { useApiClient } from "../../state/ApiContext";

export function Museum() {
  const { currentMuseumId, setCurrentMuseumId } = useApp();
  const [objects, setObjects] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { api } = useApiClient();

  useEffect(() => {
    const run = async () => {
      if (!currentMuseumId) return;
      setLoading(true);
      setError(undefined);
      try {
        const data = await api.listMuseumObjects(currentMuseumId);
        setObjects(data);
      } catch (e: any) {
        setError(e?.message || "Failed to load objects");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [currentMuseumId]);

  return (
    <View style={styles.container}>
      <Text>Museum</Text>
      <View style={styles.row}>
        <Button onPress={() => setCurrentMuseumId("demo-museum")}>
          Select Demo Museum
        </Button>
        <Button onPress={() => setCurrentMuseumId(undefined)}>Clear</Button>
      </View>
      {loading && <ActivityIndicator />}
      {error && <Text>{error}</Text>}
      <FlatList
        data={objects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            {item.image_url && (
              <Image source={{ uri: item.image_url }} style={styles.thumb} />
            )}
            <View style={{ flex: 1 }}>
              <Text>{item.name}</Text>
              {item.artist && <Text>{item.artist}</Text>}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  row: { flexDirection: "row", gap: 8, alignItems: "center" },
  item: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    paddingVertical: 8,
  },
  thumb: { width: 48, height: 48, borderRadius: 4 },
});
