import { SafeAreaView, View, Text, Pressable } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";

export const SettingsScreen = () => {
  const { signOut } = useAuth();

  return (
    <SafeAreaView>
      <View className="h-full w-full p-4">
        <Pressable
          className="flex w-full items-center justify-center rounded-2xl bg-teal-500 p-4 shadow-2xl"
          onPress={() => signOut()}
        >
          <Text className="text-white">Sign Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
