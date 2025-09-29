import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  message: string;
  type?: "success" | "error" | "info";
  theme: ReactNavigation.Theme;
};

export function Toast({ message, type = "info", theme }: Props) {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.toast,
        styles[type],
        { backgroundColor: theme.colors.card, top: top + 20 },
      ]}
    >
      <Text style={[styles.text, { color: theme.colors.text }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    zIndex: 9999,
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
  },
  success: { borderColor: "#4BB543", borderWidth: 1 },
  error: { borderColor: "#FF3333", borderWidth: 1 },
  info: { borderColor: "#5f5f5f", borderWidth: 1 },
});
