import { Button, Text } from "@react-navigation/elements";
import { StaticScreenProps } from "@react-navigation/native";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { AudioPlayer } from "../../components/AudioPlayer";
import { useApiClient } from "../../state/ApiContext";

type Props = StaticScreenProps<{ narrativeText: string }>;

export function Narrative({ route }: Props) {
  const { narrativeText } = route.params;
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const { api } = useApiClient();

  const synthesize = async () => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await api.generateAudio({
        narrative_text: narrativeText,
      });
      setAudioUrl(res.audio_url);
    } catch (e: any) {
      setError(e?.message || "Audio generation failed");
    } finally {
      setLoading(false);
    }
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
