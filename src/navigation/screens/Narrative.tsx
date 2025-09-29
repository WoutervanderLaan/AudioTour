import { Button, Text } from "@react-navigation/elements";
import { StaticScreenProps } from "@react-navigation/native";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { AudioPlayer } from "../../components/AudioPlayer";
import { useTourStore } from "../../state/stores/tourStore";
import { useShallow } from "zustand/react/shallow";
import { useApi } from "../../state/ApiContext";
import { useMutation } from "@tanstack/react-query";

export function Narrative() {
  const [localError, setLocalError] = useState<string | undefined>(undefined);

  const api = useApi();

  const { audioUrl, setAudioUrl, narrativeText } = useTourStore(
    useShallow((state) => ({
      audioUrl: state.audioUrl,
      setAudioUrl: state.setAudioUrl,
      narrativeText: state.narrativeText,
    }))
  );

  if (!narrativeText) {
    return (
      <View style={styles.container}>
        <Text>No narrative available</Text>
      </View>
    );
  }

  const synthesize = useMutation({
    mutationFn: async () => api.generateAudio({ text: narrativeText }),
    onSuccess(data) {
      setAudioUrl(data.audio_url);
    },
    onError(err) {
      console.error("Error generating audio: ", err);
      setLocalError("Error generating audio");
    },
  });

  return (
    <View style={styles.container}>
      <Text>Narrative</Text>

      <Text numberOfLines={8}>{narrativeText}</Text>

      <Button
        onPress={() => {
          setLocalError(undefined);
          synthesize.mutate();
        }}
        disabled={synthesize.isPending}
      >
        Generate Audio
      </Button>

      {synthesize.isPending && <ActivityIndicator />}

      {localError && <Text>{localError}</Text>}

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
