import { Button, Text } from "@react-navigation/elements";
import { StaticScreenProps } from "@react-navigation/native";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { AudioPlayer } from "../../components/AudioPlayer";
import { useTourStore } from "../../state/stores/tourStore";
import { useShallow } from "zustand/react/shallow";

type Props = StaticScreenProps<{ narrativeText: string }>;

export function Narrative({ route }: Props) {
  const { narrativeText } = route.params;

  const { loading, error, audioUrl, generateAudio } = useTourStore(
    useShallow((state) => ({
      loading: state.loading,
      error: state.error,
      audioUrl: state.audioUrl,
      generateAudio: state.generateAudio,
    }))
  );

  const synthesize = async () => {
    await generateAudio(narrativeText);
  };

  return (
    <View style={styles.container}>
      <Text>Narrative</Text>

      <Text numberOfLines={8}>{narrativeText}</Text>

      <Button onPress={synthesize} disabled={loading}>
        Generate Audio
      </Button>

      {loading && <ActivityIndicator />}

      {error && <Text>{error}</Text>}

      {audioUrl && <AudioPlayer src={audioUrl} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
});
