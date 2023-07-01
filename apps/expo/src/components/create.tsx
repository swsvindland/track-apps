import React, { FC, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Dialog from "react-native-dialog";
import { trpc } from "../utils/trpc";

interface State {
  systolic?: string;
  diastolic?: string;
  heartRate?: string;
}

export const Create: FC = () => {
  const utils = trpc.useContext();
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<State>({
    systolic: undefined,
    diastolic: undefined,
    heartRate: undefined,
  });

  const createMutation = trpc.bloodPressure.create.useMutation({
    onSuccess: () => {
      setVisible(false);
      utils.bloodPressure.invalidate();
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
      systolic: parseInt(state?.systolic ?? "0"),
      diastolic: parseInt(state?.diastolic ?? "0"),
      heartRate: state.heartRate ? parseInt(state.heartRate) : undefined,
    });
  };

  return (
    <View className="absolute bottom-4 right-4">
      <Pressable
        className="flex w-full items-center justify-center rounded-2xl bg-teal-500 p-4 shadow-2xl"
        onPress={() => showDialog()}
      >
        <Text className="text-white">Create</Text>
      </Pressable>
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
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Create" onPress={handleCreate} />
      </Dialog.Container>
    </View>
  );
};
