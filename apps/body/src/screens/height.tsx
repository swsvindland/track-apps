import React from "react";
import { View, SafeAreaView } from "react-native";

import { Create } from "../components/height/create";
import { GridList } from "../components/height/gridList";
import { HeightChart } from "@acme/ui";

export const HeightScreen = () => {
  return (
    <SafeAreaView>
      <View className="h-full w-full bg-background px-2 pt-4 dark:bg-black">
        <HeightChart />
        <GridList />
        <Create />
      </View>
    </SafeAreaView>
  );
};
