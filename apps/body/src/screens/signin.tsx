import React from "react";

import { View, SafeAreaView } from "react-native";

import SignInWithOAuth from "../components/SignInWithOAuth";

export const SignInSignUpScreen = () => {
  return (
    <SafeAreaView>
      <View className="h-full w-full px-2 dark:bg-black">
        <SignInWithOAuth />
      </View>
    </SafeAreaView>
  );
};