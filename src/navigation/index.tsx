import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderButton, Text } from "@react-navigation/elements";
import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Capture } from "./screens/Capture";
import { Museum } from "./screens/Museum";
import { Recommendations } from "./screens/Recommendations";
import { ObjectDetail } from "./screens/ObjectDetail";
import { Narrative } from "./screens/Narrative";
import { Settings } from "./screens/Settings";
import { NotFound } from "./screens/NotFound";

const HomeTabs = createBottomTabNavigator({
  screens: {
    Capture: {
      screen: Capture,
      options: {
        title: "Capture",
      },
    },
    Museum: {
      screen: Museum,
      options: {
        title: "Museum",
      },
    },
    Recommendations: {
      screen: Recommendations,
      options: {
        title: "For You",
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: "Home",
        headerShown: false,
      },
    },
    ObjectDetail: {
      screen: ObjectDetail,
    },
    Narrative: {
      screen: Narrative,
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: "modal",
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: "404",
      },
      linking: {
        path: "*",
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
