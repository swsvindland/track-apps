import { SafeAreaView, ScrollView } from "react-native";
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
      <ScrollView className="h-full w-full px-2 pt-4 dark:bg-black">
        <WeightChart />
        <HeightChart />
        <HeartRateChart />
        <BmiChart />
        <BloodPressureChart />
      </ScrollView>
    </SafeAreaView>
  );
};
