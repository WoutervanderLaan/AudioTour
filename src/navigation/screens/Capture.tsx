import { Button, Text } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { ApiClient } from "../../api/client";
import { useApp } from "../../state/AppContext";

export function Capture() {
  const nav = useNavigation();
  const { userSessionId, pushRecentObjectId } = useApp();
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const pickImage = async () => {
    setError(undefined);
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.status !== "granted") {
      setError("Camera permission is required");
      return;
    }
    const res = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (!res.canceled && res.assets && res.assets[0]?.uri) {
      setImageUri(res.assets[0].uri);
    }
  };

  const upload = async () => {
    if (!imageUri) return;
    setLoading(true);
    setError(undefined);
    try {
      const result = await ApiClient.uploadPhoto({ uri: imageUri });
      pushRecentObjectId(result.object_id);
      nav.navigate("ObjectDetail", { objectId: result.object_id });
    } catch (e: any) {
      setError(e?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{userSessionId}</Text>

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
      {error && <Text>{error}</Text>}
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
