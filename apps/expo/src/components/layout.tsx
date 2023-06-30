import { FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeIcon,
  Cog6ToothIcon,
  ChartPieIcon,
} from "react-native-heroicons/outline";
import { HomeScreen } from "../screens/home";
import { ReportsScreen } from "../screens/reports";
import { SettingsScreen } from "../screens/settings";

const Tab = createBottomTabNavigator();

export const Layout: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case "Home":
              return <HomeIcon color={color} size={size} />;
            case "Reports":
              return <ChartPieIcon color={color} size={size} />;
            case "Settings":
              return <Cog6ToothIcon color={color} size={size} />;
            default:
              return null;
          }
        },
        tabBarActiveTintColor: "teal",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} navigationKey="home" />
      <Tab.Screen
        name="Reports"
        component={ReportsScreen}
        navigationKey="reports"
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        navigationKey="settings"
      />
    </Tab.Navigator>
  );
};
