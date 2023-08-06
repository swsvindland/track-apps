import React from "react";
import { View, SafeAreaView } from "react-native";

import { BloodPressureChart, HeartRateChart } from "@acme/ui";
import { Create } from "../components/create";
import { GridList } from "../components/gridList";

export const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View className="h-full w-full bg-background px-2 pt-4 dark:bg-black">
        <View className="flex flex-row">
          <BloodPressureChart />
          <View className="hidden md:flex">
            <HeartRateChart />
          </View>
        </View>
        <GridList />
        <Create />
      </View>
    </SafeAreaView>
  );
};
