import React, { FC, useState } from "react";
import { View } from "react-native";
import Dialog from "react-native-dialog";
import { trpc } from "@acme/utils";
import { PlusIcon } from "react-native-heroicons/outline";
import { Button } from "@acme/ui";

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
      <Button
        icon={<PlusIcon color="#F7C619" />}
        text="Create"
        onPress={() => showDialog()}
      />
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
