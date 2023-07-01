import { useOAuth } from "@clerk/clerk-expo";
import React from "react";
import { Text, Pressable, View, Image } from "react-native";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  const apple = useOAuth({ strategy: "oauth_apple" });
  const google = useOAuth({ strategy: "oauth_google" });

  const handleSignInWithApplePress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await apple.startOAuthFlow();
      if (createdSessionId) {
        setActive?.({ session: createdSessionId });
      } else {
        // Modify this code to use signIn or signUp to set this missing requirements you set in your dashboard.
        throw new Error(
          "There are unmet requirements, modifiy this else to handle them",
        );
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.log("error signing in", err);
    }
  }, []);

  const handleSignInWithGooglePress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await google.startOAuthFlow();
      if (createdSessionId) {
        setActive?.({ session: createdSessionId });
      } else {
        // Modify this code to use signIn or signUp to set this missing requirements you set in your dashboard.
        throw new Error(
          "There are unmet requirements, modifiy this else to handle them",
        );
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.log("error signing in", err);
    }
  }, []);

  return (
    <View className="flex h-full items-center justify-center gap-4 px-2">
      <View>
        <Image source={require("../images/logo.png")} style={{ height: 128 }} />
        <Text className="dark:text-white">Body Track</Text>
      </View>
      <Pressable
        className="flex w-full items-center justify-center rounded-full bg-rose-400 p-4"
        onPress={handleSignInWithApplePress}
      >
        <Text className="text-lg font-bold uppercase text-white">
          Sign In with Apple
        </Text>
      </Pressable>
      <Pressable
        className="flex w-full items-center justify-center rounded-full bg-rose-400 p-4"
        onPress={handleSignInWithGooglePress}
      >
        <Text className="text-lg font-bold uppercase text-white">
          Sign In with Google
        </Text>
      </Pressable>
    </View>
  );
};

export default SignInWithOAuth;
