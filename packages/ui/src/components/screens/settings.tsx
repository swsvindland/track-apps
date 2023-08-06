import { SafeAreaView, View } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { DeleteAccount } from "../deleteAccount";
import { Button } from "../button";

export const SettingsScreen = () => {
  const { signOut } = useAuth();

  return (
    <SafeAreaView>
      <View className="h-full w-full bg-background px-2 pt-4 dark:bg-black dark:bg-black">
        <Button onPress={() => signOut()} text="Sign Out" fullWidth />
        <View className="h-4" />
        <DeleteAccount />
      </View>
    </SafeAreaView>
  );
};
