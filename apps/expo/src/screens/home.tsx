import React from "react";
import { View, SafeAreaView } from "react-native";

import { BloodPressureChart } from "../components/bloodPressureChart";
import { Create } from "../components/create";
import { GridList } from "../components/gridList";

export const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View className="h-full w-full p-4">
        <BloodPressureChart />
        <GridList />
        <Create />
      </View>
    </SafeAreaView>
  );
};
