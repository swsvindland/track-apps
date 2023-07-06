import { Pressable, Text } from "react-native";
import { FC } from "react";
import { classNames } from "@acme/utils";

interface ButtonProps {
  text: string;
  onPress: () => void;
  className?: string;
}

export const Button: FC<ButtonProps> = ({ text, onPress, className }) => {
  return (
    <Pressable
      className={classNames(
        className ?? "",
        "flex w-full items-center justify-center rounded-full bg-teal-500 p-4 active:bg-teal-700",
      )}
      onPress={onPress}
    >
      <Text className="text-lg font-bold uppercase text-white">{text}</Text>
    </Pressable>
  );
};
