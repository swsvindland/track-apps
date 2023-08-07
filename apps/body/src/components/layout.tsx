import { FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeIcon,
  Cog6ToothIcon,
  ChartPieIcon,
  ArrowLongUpIcon,
} from "react-native-heroicons/outline";
import { HomeScreen } from "../screens/home";
import { ReportsScreen, SettingsScreen } from "@acme/ui";
import { HeightScreen } from "../screens/height";

const Tab = createBottomTabNavigator();

export const Layout: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case "Home":
              return <HomeIcon color={color} size={size} />;
            case "Height":
              return <ArrowLongUpIcon color={color} size={size} />;
            case "Reports":
              return <ChartPieIcon color={color} size={size} />;
            case "Settings":
              return <Cog6ToothIcon color={color} size={size} />;
            default:
              return null;
          }
        },
        tabBarStyle: {
          backgroundColor: "#2E586A",
        },
        tabBarActiveTintColor: "#F7C619",
        tabBarInactiveTintColor: "#AFD257",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        navigationKey="home"
        options={{
          headerStyle: {
            backgroundColor: "#2E586A",
          },
          headerTintColor: "#F7C619",
        }}
      />
      <Tab.Screen
        name="Height"
        component={HeightScreen}
        navigationKey="height"
        options={{
          headerStyle: {
            backgroundColor: "#2E586A",
          },
          headerTintColor: "#F7C619",
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsScreen}
        navigationKey="reports"
        options={{
          headerStyle: {
            backgroundColor: "#2E586A",
          },
          headerTintColor: "#F7C619",
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        navigationKey="settings"
        options={{
          headerStyle: {
            backgroundColor: "#2E586A",
          },
          headerTintColor: "#F7C619",
        }}
      />
    </Tab.Navigator>
  );
};
