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
import { useColorScheme } from "react-native";

const Tab = createBottomTabNavigator();

export const Layout: FC = () => {
  const colorScheme = useColorScheme();

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
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "#262626" : "#fff",
        },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        navigationKey="home"
        options={{
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#262626" : "#fff",
          },
          headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsScreen}
        navigationKey="reports"
        options={{
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#262626" : "#fff",
          },
          headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        navigationKey="settings"
        options={{
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#262626" : "#fff",
          },
          headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
        }}
      />
    </Tab.Navigator>
  );
};
