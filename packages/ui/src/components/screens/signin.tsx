import React, { FC } from "react";

import { View, SafeAreaView } from "react-native";

import { SignInWithOAuth } from "../signInWithOAuth";

interface Props {
  logo: "body" | "bp" | "water";
}

export const SignInSignUpScreen: FC<Props> = ({ logo }) => {
  return (
    <SafeAreaView>
      <View className="h-full w-full bg-teal-50 px-2 pt-4 dark:bg-black">
        <SignInWithOAuth logo={logo} />
      </View>
    </SafeAreaView>
  );
};
