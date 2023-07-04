import React, { FC, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Dialog from "react-native-dialog";
import { trpc } from "../../utils/trpc";
import { PlusIcon } from "react-native-heroicons/outline";

interface State {
  weight?: string;
}

export const Create: FC = () => {
  const utils = trpc.useContext();
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<State>({
    weight: undefined,
  });

  const createMutation = trpc.weight.create.useMutation({
    onSuccess: () => {
      setVisible(false);
      utils.weight.invalidate();
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
      weight: parseFloat(state?.weight ?? "0"),
    });
  };

  return (
    <View className="absolute bottom-4 right-4">
      <Pressable
        className="flex w-full items-center justify-center rounded-full bg-rose-400 p-4"
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
        <Dialog.Description>
          Create a new blood pressure entry.
        </Dialog.Description>
        <Dialog.Input
          value={state.weight}
          placeholder="Weight"
          keyboardType="numeric"
          onChangeText={(text) => setState({ ...state, weight: text })}
        />
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Create" onPress={handleCreate} />
      </Dialog.Container>
    </View>
  );
};
