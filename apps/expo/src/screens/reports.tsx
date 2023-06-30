import { SafeAreaView, View, Text, ScrollView } from "react-native";
import React from "react";
import { BloodPressureChart } from "../components/bloodPressureChart";

export const ReportsScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView className="h-full w-full p-4">
        <BloodPressureChart />
        <BloodPressureChart />
        <BloodPressureChart />
      </ScrollView>
    </SafeAreaView>
  );
};
