import { useOAuth } from "@clerk/clerk-expo";
import React, { FC } from "react";
import { View, Image } from "react-native";
import { useWarmUpBrowser } from "@acme/utils";
import { Button } from "./button";

interface SignInWithOAuthProps {
  logo: string;
}

export const SignInWithOAuth: FC<SignInWithOAuthProps> = ({ logo }) => {
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
    <View className="flex-1 items-center justify-center">
      <View>
        {logo === "bp" ? (
          <Image
            source={require(`../images/bp.png`)}
            style={{ height: 128, width: 128 }}
          />
        ) : null}
        {logo === "body" ? (
          <Image
            source={require(`../images/body.png`)}
            style={{ height: 128, width: 128 }}
          />
        ) : null}
        {logo === "water" ? (
          <Image
            source={require(`../images/water.png`)}
            style={{ height: 128, width: 128 }}
          />
        ) : null}
        {logo === "punch" ? (
          <Image
            source={require(`../images/punch.png`)}
            style={{ height: 128, width: 128 }}
          />
        ) : null}
      </View>
      <View className="my-2 w-full">
        <Button
          onPress={handleSignInWithApplePress}
          text="Sign In With Apple"
        />
      </View>
      <View className="my-2 w-full">
        <Button
          onPress={handleSignInWithGooglePress}
          text="Sign In With Google"
        />
      </View>
    </View>
  );
};
