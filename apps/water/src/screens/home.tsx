import React from "react";
import { View, SafeAreaView } from "react-native";

import { WaterChart } from "@acme/ui";
import { Create } from "../components/create";

export const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View className="h-full w-full px-2 pt-4 dark:bg-black">
        <WaterChart />
        <Create />
      </View>
    </SafeAreaView>
  );
};
