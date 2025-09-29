import { Assets as NavigationAssets } from "@react-navigation/elements";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { createURL } from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { StatusBar, useColorScheme } from "react-native";
import { Navigation } from "./navigation";
import { ApiProvider } from "./state/ApiContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./state/ToastContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

Asset.loadAsync([...NavigationAssets]);

SplashScreen.preventAutoHideAsync();

const prefix = createURL("/");

const queryClient = new QueryClient();

export function App() {
  const colorScheme = useColorScheme();

  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        animated
      />
      <ApiProvider>
        <SafeAreaProvider>
          <ToastProvider theme={theme}>
            <Navigation
              theme={theme}
              linking={{
                enabled: "auto",
                prefixes: [prefix],
              }}
              onReady={() => {
                SplashScreen.hideAsync();
              }}
            />
          </ToastProvider>
        </SafeAreaProvider>
      </ApiProvider>
    </QueryClientProvider>
  );
}
