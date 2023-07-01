import { SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { BloodPressureChart } from "../components/bloodPressureChart";
import { HeartRateChart } from "../components/heartRateChart";

export const ReportsScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView className="h-full w-full px-2 pt-4 dark:bg-black">
        <BloodPressureChart />
        <HeartRateChart />
      </ScrollView>
    </SafeAreaView>
  );
};
