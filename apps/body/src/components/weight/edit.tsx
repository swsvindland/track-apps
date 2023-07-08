import React, { FC, useState } from "react";
import { View } from "react-native";
import Dialog from "react-native-dialog";
import { trpc } from "@acme/utils";
import { Weight } from "./gridList";

interface State {
  weight?: string;
}

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  selected: Weight;
}

export const Edit: FC<Props> = ({ visible, setVisible, selected }) => {
  const utils = trpc.useContext();
  const [state, setState] = useState<State>({
    weight: selected.weight.toString(),
  });

  const updateMutation = trpc.weight.update.useMutation({
    onSuccess: () => {
      setVisible(false);
      utils.bloodPressure.invalidate();
    },
  });

  const deleteMutation = trpc.weight.delete.useMutation({
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
      weight: parseFloat(state?.weight ?? "0"),
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
          value={state.weight}
          placeholder="Weight"
          keyboardType="numeric"
          onChangeText={(text) => setState({ ...state, weight: text })}
        />
        <Dialog.Button label="Delete" onPress={handleDelete} />
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Update" onPress={handleUpdate} />
      </Dialog.Container>
    </View>
  );
};
