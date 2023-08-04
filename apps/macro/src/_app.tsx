import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TRPCProvider } from "@acme/utils";

import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { tokenCache } from "@acme/utils";
import { NavigationContainer } from "@react-navigation/native";
import { Layout } from "./components/layout";
import { SignInSignUpScreen } from "@acme/ui";

const CLERK_PUBLISHABLE_KEY = !__DEV__
  ? "pk_live_Y2xlcmsud29ya291dC10cmFjay5jb20k"
  : "pk_test_c2F2ZWQtbGVvcGFyZC01NC5jbGVyay5hY2NvdW50cy5kZXYk";

export const App = () => {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
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
        <SignInSignUpScreen logo="bp" />
      </SignedOut>
    </ClerkProvider>
  );
};
