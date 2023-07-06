import React from "react";

import { View } from "react-native";

import { SignInWithOAuth } from "@acme/ui";

export const SignInSignUpScreen = () => {
  return (
    <View className="h-full w-full px-2 dark:bg-black">
      <SignInWithOAuth logo="body" />
    </View>
  );
};
