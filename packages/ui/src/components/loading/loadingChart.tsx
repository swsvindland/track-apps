import { FC } from "react";
import { View } from "react-native";

export const LoadingChart: FC = () => {
  return (
    <View className="flex items-center justify-center">
      <View className="h-6 w-16 animate-pulse rounded-full bg-card" />
      <View className="my-2 h-[220px] w-full animate-pulse rounded-2xl bg-card" />
    </View>
  );
};
