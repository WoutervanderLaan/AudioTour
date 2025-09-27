import { Button, Text } from "@react-navigation/elements";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useMuseumStore } from "../../state/stores/museumStore";
import { useShallow } from "zustand/react/shallow";
import {
  useUserLocation,
  haversineDistanceMeters,
} from "../../hooks/useUserLocation";
import { KNOWN_MUSEUMS, MuseumLocation } from "../../constants/museums";

export function Museum() {
  const [loading, setLoading] = React.useState(true);

  const { currentMuseumId, setMuseum, setObjects, objects } = useMuseumStore(
    useShallow((state) => ({
      currentMuseumId: state.currentMuseumId,
      setMuseum: state.setMuseum,
      setObjects: state.setObjects,
      objects: state.objects,
    }))
  );

  // useEffect(() => {
  // setObjects();
  // }, [currentMuseumId]);

  const { coords, error: locError } = useUserLocation({
    shouldWatch: true,
    distanceInterval: 25,
  });

  const sortedByDistance: MuseumLocation[] = React.useMemo(() => {
    if (!coords) return [];

    const museumsWithDistance = KNOWN_MUSEUMS.map((m) => ({
      ...m,
      distance: haversineDistanceMeters(coords, m.coords),
    }));

    const sortedMuseumsWithDistance = museumsWithDistance.sort((a, b) => {
      return a.distance - b.distance;
    });

    setLoading(false);

    return sortedMuseumsWithDistance;
  }, [coords]);

  return (
    <View style={styles.container}>
      <Text>Museum</Text>

      <View style={styles.row}>
        <Button onPress={() => setMuseum(undefined)}>Clear</Button>
      </View>

      {loading && <ActivityIndicator />}

      {locError && <Text>{locError}</Text>}

      <FlatList
        data={sortedByDistance}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setMuseum(item.id)}>
            <Text
              style={{
                fontWeight: currentMuseumId === item.id ? "bold" : "normal",
                flex: 1,
              }}
            >
              {item.name} ({item.distance?.toFixed(0) || "???"} m)
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  row: { flexDirection: "row", gap: 8, alignItems: "center" },
});
