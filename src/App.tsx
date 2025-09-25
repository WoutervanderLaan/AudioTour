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

Asset.loadAsync([...NavigationAssets]);

SplashScreen.preventAutoHideAsync();

const prefix = createURL("/");

const queryClient = new QueryClient();

export function App() {
  const colorScheme = useColorScheme();

  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <QueryClientProvider client={queryClient}>
      <ApiProvider>
        <StatusBar
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
          animated
        />
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
      </ApiProvider>
    </QueryClientProvider>
  );
}
