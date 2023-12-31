import React from "react";
import { View, SafeAreaView } from "react-native";

import { WeightChart } from "@acme/ui";
import { Create } from "../components/weight/create";
import { GridList } from "../components/weight/gridList";

export const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View className="h-full w-full bg-background px-2 pt-4 dark:bg-black">
        <WeightChart />
        <GridList />
        <Create />
      </View>
    </SafeAreaView>
  );
};
