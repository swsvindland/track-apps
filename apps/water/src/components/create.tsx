import React, { FC } from "react";
import { View } from "react-native";
import { trpc } from "@acme/utils";
import { PlusIcon } from "react-native-heroicons/outline";
import { Button } from "@acme/ui";

export const Create: FC = () => {
  const utils = trpc.useContext();

  const createMutation = trpc.water.create.useMutation({
    onSuccess: () => {
      utils.water.invalidate();
    },
  });

  const handleCreate = async () => {
    createMutation.mutate({ amount: 8, type: "water" });
  };

  return (
    <View className="absolute bottom-4 w-full">
      <View className="flex w-full items-center justify-center">
        <Button
          icon={<PlusIcon color="white" />}
          text="Water"
          onPress={handleCreate}
        />
      </View>
    </View>
  );
};
