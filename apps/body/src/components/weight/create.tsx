import React, { FC, useState } from "react";
import { View } from "react-native";
import Dialog from "react-native-dialog";
import { trpc } from "@acme/utils";
import { PlusIcon } from "react-native-heroicons/outline";
import { Button } from "@acme/ui";

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
      <Button
        icon={<PlusIcon color="#F7C619" />}
        text="Create"
        onPress={() => showDialog()}
      />
      <Dialog.Container visible={visible}>
        <Dialog.Title>Add New Entry</Dialog.Title>
        <Dialog.Description>Create a new weight entry.</Dialog.Description>
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
