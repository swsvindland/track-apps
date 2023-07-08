import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { FC } from "react";
import { classNames } from "@acme/utils";

interface ButtonProps {
  icon?: ReactNode;
  text: string;
  onPress: () => void;
  className?: string;
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
}

export const Button: FC<ButtonProps> = ({
  icon,
  text,
  onPress,
  className,
  fullWidth,
  variant,
}) => {
  return (
    <Pressable
      className={classNames(
        className ?? "",
        fullWidth ? "w-full" : "",
        variant === "secondary"
          ? "flex flex-row items-center justify-center rounded-full border border-teal-500 bg-transparent p-4 active:bg-teal-100"
          : "flex flex-row items-center justify-center rounded-full bg-teal-500 p-4 shadow-2xl active:bg-teal-700",
      )}
      onPress={onPress}
    >
      {icon && <View className="mr-2">{icon}</View>}
      <Text
        className={classNames(
          variant === "secondary" ? "text-teal-500" : "text-white",
          "text-lg font-bold uppercase",
        )}
      >
        {text}
      </Text>
    </Pressable>
  );
};
