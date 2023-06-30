import { SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { BloodPressureChart } from "../components/bloodPressureChart";
import { HeartRateChart } from "../components/heartRateChart";

export const ReportsScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView className="h-full w-full p-4">
        <BloodPressureChart />
        <HeartRateChart />
      </ScrollView>
    </SafeAreaView>
  );
};
