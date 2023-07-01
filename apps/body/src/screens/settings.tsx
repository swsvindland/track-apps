import { SafeAreaView, View, Text, Pressable } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { DeleteAccount } from "../components/deleteAccount";

export const SettingsScreen = () => {
  const { signOut } = useAuth();

  return (
    <SafeAreaView>
      <View className="h-full w-full px-2 pt-4 dark:bg-black">
        <Pressable
          className="flex w-full items-center justify-center rounded-full bg-rose-400 p-4"
          onPress={() => signOut()}
        >
          <Text className="text-lg font-bold uppercase text-white">
            Sign Out
          </Text>
        </Pressable>
        <View className="h-4" />
        <DeleteAccount />
      </View>
    </SafeAreaView>
  );
};
