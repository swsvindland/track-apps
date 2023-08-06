import { SafeAreaView, ScrollView, View } from "react-native";
import React from "react";
import {
  BmiChart,
  HeightChart,
  WeightChart,
  HeartRateChart,
  BloodPressureChart,
} from "../charts";

export const ReportsScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView className="h-full w-full bg-background px-2 pt-4 dark:bg-black dark:bg-black">
        <View className="flex flex-wrap sm:flex-row">
          <WeightChart />
          <HeartRateChart />
          <BmiChart />
          <BloodPressureChart />
          <HeightChart />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
