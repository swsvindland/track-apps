import React, { FC, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Dialog from "react-native-dialog";
import { trpc } from "@acme/utils";
import { PlusIcon } from "react-native-heroicons/outline";

interface State {
  height?: string;
}

export const Create: FC = () => {
  const utils = trpc.useContext();
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<State>({
    height: undefined,
  });

  const createMutation = trpc.height.create.useMutation({
    onSuccess: () => {
      setVisible(false);
      utils.height.invalidate();
    },
  });

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCreate = async () => {
    createMutation.mutate({
      height: parseFloat(state?.height ?? "0"),
    });
  };

  return (
    <View className="absolute bottom-4 right-4">
      <Pressable
        className="flex w-full items-center justify-center rounded-full bg-fuchsia-400 p-4"
        onPress={() => showDialog()}
      >
        <View className="flex flex-row items-center justify-center">
          <PlusIcon color="white" />
          <Text className="ml-2 text-lg font-bold uppercase text-white">
            Create
          </Text>
        </View>
      </Pressable>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Add New Entry</Dialog.Title>
        <Dialog.Description>Create a new height entry.</Dialog.Description>
        <Dialog.Input
          value={state.height}
          placeholder="Height"
          keyboardType="numeric"
          onChangeText={(text) => setState({ ...state, height: text })}
        />
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Create" onPress={handleCreate} />
      </Dialog.Container>
    </View>
  );
};
