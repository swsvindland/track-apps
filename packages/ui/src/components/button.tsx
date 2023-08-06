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
          ? "flex flex-row items-center justify-center rounded-full border border-primary bg-transparent px-6 py-4 active:bg-teal-100"
          : "flex flex-row items-center justify-center rounded-full bg-primary px-6 py-4 active:bg-primary-dark",
      )}
      onPress={onPress}
    >
      {icon && <View className="mr-2">{icon}</View>}
      <Text
        className={classNames(
          variant === "secondary" ? "text-primary" : "text-secondary",
          "text-lg font-bold uppercase",
        )}
      >
        {text}
      </Text>
    </Pressable>
  );
};
