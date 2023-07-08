import React, { FC, useState } from "react";
import { View } from "react-native";
import Dialog from "react-native-dialog";
import { trpc } from "@acme/utils";
import { Height } from "./gridList";

interface State {
  height?: string;
}

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  selected: Height;
}

export const Edit: FC<Props> = ({ visible, setVisible, selected }) => {
  const utils = trpc.useContext();
  const [state, setState] = useState<State>({
    height: selected.height.toString(),
  });

  const updateMutation = trpc.height.update.useMutation({
    onSuccess: () => {
      setVisible(false);
      utils.bloodPressure.invalidate();
    },
  });

  const deleteMutation = trpc.height.delete.useMutation({
    onSuccess: () => {
      setVisible(false);
      utils.bloodPressure.invalidate();
    },
  });

  const handleCancel = () => {
    setVisible(false);
  };

  const handleUpdate = () => {
    updateMutation.mutate({
      id: selected.id,
      height: parseFloat(state?.height ?? "0"),
    });
  };

  const handleDelete = () => {
    deleteMutation.mutate({ id: selected.id });
  };

  return (
    <View>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Add New Entry</Dialog.Title>
        <Dialog.Description>
          Create a new blood pressure entry.
        </Dialog.Description>
        <Dialog.Input
          value={state.height}
          placeholder="Weight"
          keyboardType="numeric"
          onChangeText={(text) => setState({ ...state, height: text })}
        />
        <Dialog.Button label="Delete" onPress={handleDelete} />
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Update" onPress={handleUpdate} />
      </Dialog.Container>
    </View>
  );
};
