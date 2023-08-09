import { FC } from "react";
import { View } from "react-native";
import { LoadingBox } from "./loadingBox";

export const LoadingGridItems: FC = () => {
  return (
    <View>
      <LoadingBox />
      <LoadingBox />
      <LoadingBox />
      <LoadingBox />
      <LoadingBox />
      <LoadingBox />
      <LoadingBox />
      <LoadingBox />
    </View>
  );
};
