import React, { FC } from "react";

import { View, SafeAreaView } from "react-native";

import { SignInWithOAuth } from "../signInWithOAuth";

interface Props {
  logo: "body" | "bp" | "water";
}

export const SignInSignUpScreen: FC<Props> = ({ logo }) => {
  return (
    <SafeAreaView>
      <View className="h-full w-full px-2 dark:bg-black">
        <SignInWithOAuth logo={logo} />
      </View>
    </SafeAreaView>
  );
};
