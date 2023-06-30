import React, { FC, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Dialog from "react-native-dialog";
import { trpc } from "../utils/trpc";
import { useAuth } from "@clerk/clerk-expo";

export const DeleteAccount: FC = () => {
  const utils = trpc.useContext();
  const { signOut } = useAuth();
  const [visible, setVisible] = useState(false);

  const deleteMutation = trpc.bloodPressure.deleteAll.useMutation({
    onSuccess: () => {
      setVisible(false);
      utils.bloodPressure.invalidate();
      signOut();
    },
  });

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <View>
      <Pressable
        className="flex w-full items-center justify-center rounded-2xl bg-red-500 p-4 shadow-2xl"
        onPress={() => showDialog()}
      >
        <Text className="text-white">Delete Account</Text>
      </Pressable>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Account delete</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this account? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Delete" onPress={handleDelete} />
      </Dialog.Container>
    </View>
  );
};
