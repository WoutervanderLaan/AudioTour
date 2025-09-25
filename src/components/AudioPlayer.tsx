import React, { useEffect, useState } from "react";
import { Button, Text } from "@react-navigation/elements";
import { ActivityIndicator, StyleSheet, View } from "react-native";

// Simple stub that just shows the URL and fake play/pause
export function AudioPlayer({ src }: { src: string }) {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    setLoading(true);
    // Stub: in future integrate expo-av
    setTimeout(() => {
      setPlaying((p) => !p);
      setLoading(false);
    }, 300);
  };

  return (
    <View style={styles.container}>
      <Text selectable>{src}</Text>
      <Button onPress={toggle} disabled={loading}>
        {playing ? "Pause" : "Play"}
      </Button>
      {loading && <ActivityIndicator />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
});
