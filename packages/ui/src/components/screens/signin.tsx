import React, { FC } from "react";

import { View, SafeAreaView } from "react-native";

import { SignInWithOAuth } from "../signInWithOAuth";

interface Props {
  logo: "body" | "bp" | "water" | "punch";
}

export const SignInSignUpScreen: FC<Props> = ({ logo }) => {
  return (
    <SafeAreaView className="bg-background dark:bg-black">
      <View className="h-full w-full px-2 pt-4">
        <SignInWithOAuth logo={logo} />
      </View>
    </SafeAreaView>
  );
};
