import { Button, Text } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { useUserSessionStore } from "../../state/stores/userSessionStore";
import { useTourStore } from "../../state/stores/tourStore";
import { useShallow } from "zustand/react/shallow";

export function Capture() {
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [localError, setLocalError] = useState<string | undefined>(undefined);

  const navigate = useNavigation();
  const sessionId = useUserSessionStore((s) => s.sessionId);

  const { uploadAndRecognize, loading, error } = useTourStore(
    useShallow((state) => ({
      uploadAndRecognize: state.uploadAndRecognize,
      loading: state.loading,
      error: state.error,
    }))
  );

  const pickImage = async () => {
    setLocalError(undefined);

    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (permission.status !== "granted") {
      setLocalError("Camera permission is required");
      return;
    }

    const res = await ImagePicker.launchCameraAsync({ quality: 0.7 });

    if (!res.canceled && res.assets && res.assets[0]?.uri) {
      setImageUri(res.assets[0].uri);
    }
  };

  const upload = async () => {
    if (!imageUri) return;

    await uploadAndRecognize(imageUri);

    const objectId = useTourStore.getState().currentObjectId;

    if (objectId) {
      navigate.navigate("ObjectDetail", { objectId });
    }
  };

  return (
    <View style={styles.container}>
      <Text>{sessionId}</Text>

      <Button onPress={pickImage}>Take Photo</Button>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} />}

      <Button
        onPress={upload}
        disabled={!imageUri || loading}
        style={{ opacity: !imageUri || loading ? 0.5 : 1 }}
      >
        Upload & Identify
      </Button>

      {loading && <ActivityIndicator />}
      {(error || localError) && <Text>{error || localError}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 16,
  },
  preview: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
});
