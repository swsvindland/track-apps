import React, { FC, useState } from "react";
import { View } from "react-native";
import Dialog from "react-native-dialog";
import { trpc } from "@acme/utils";
import { BloodPressure } from "./gridList";

interface State {
  systolic?: string;
  diastolic?: string;
  heartRate?: string;
}

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  selected: BloodPressure;
}

export const Edit: FC<Props> = ({ visible, setVisible, selected }) => {
  const utils = trpc.useContext();
  const [state, setState] = useState<State>({
    systolic: selected.systolic.toString(),
    diastolic: selected.diastolic.toString(),
    heartRate: selected.heartRate?.toString(),
  });

  const updateMutation = trpc.bloodPressure.update.useMutation({
    onSuccess: () => {
      setVisible(false);
      utils.bloodPressure.invalidate();
    },
  });

  const deleteMutation = trpc.bloodPressure.delete.useMutation({
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
      systolic: parseInt(state?.systolic ?? "0"),
      diastolic: parseInt(state?.diastolic ?? "0"),
      heartRate: state.heartRate ? parseInt(state.heartRate) : undefined,
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
          value={state.systolic}
          placeholder="Systolic"
          keyboardType="numeric"
          onChangeText={(text) => setState({ ...state, systolic: text })}
        />
        <Dialog.Input
          value={state.diastolic}
          placeholder="Diastolic"
          keyboardType="numeric"
          onChangeText={(text) => setState({ ...state, diastolic: text })}
        />
        <Dialog.Input
          value={state.heartRate}
          placeholder="Heart Rate"
          keyboardType="numeric"
          onChangeText={(text) => setState({ ...state, heartRate: text })}
        />
        <Dialog.Button label="Delete" onPress={handleDelete} />
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Update" onPress={handleUpdate} />
      </Dialog.Container>
    </View>
  );
};
