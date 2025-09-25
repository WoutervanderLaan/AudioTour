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
import { useMuseumStore } from "../../state/stores/museumStore";
import { useShallow } from "zustand/react/shallow";

export function Museum() {
  const { currentMuseumId, setMuseum, fetchObjects, objects, loading, error } =
    useMuseumStore(
      useShallow((state) => ({
        currentMuseumId: state.currentMuseumId,
        setMuseum: state.setMuseum,
        fetchObjects: state.fetchObjects,
        objects: state.objects,
        loading: state.loading,
        error: state.error,
      }))
    );

  useEffect(() => {
    fetchObjects();
  }, [currentMuseumId]);

  return (
    <View style={styles.container}>
      <Text>Museum</Text>

      <View style={styles.row}>
        <Button onPress={() => setMuseum("demo-museum")}>
          Select Demo Museum
        </Button>
        <Button onPress={() => setMuseum(undefined)}>Clear</Button>
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
