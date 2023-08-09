import { FC } from "react";
import { View } from "react-native";

export const LoadingBox: FC = () => {
  return (
    <View className="my-2 h-16 w-full animate-pulse rounded-2xl bg-card" />
  );
};
