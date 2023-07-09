import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TRPCProvider } from "@acme/utils";

import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { tokenCache } from "@acme/utils";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { Layout } from "./components/layout";
import { SignInSignUpScreen } from "@acme/ui";

export const App = () => {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <SignedIn>
        <TRPCProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <Layout />
            </NavigationContainer>
          </SafeAreaProvider>
        </TRPCProvider>
      </SignedIn>
      <SignedOut>
        <SignInSignUpScreen logo="water" />
      </SignedOut>
    </ClerkProvider>
  );
};
