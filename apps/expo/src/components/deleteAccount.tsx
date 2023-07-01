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
        className="flex w-full items-center justify-center rounded-full border border-rose-400 bg-white p-4 dark:bg-black"
        onPress={() => showDialog()}
      >
        <Text className="text-lg font-bold uppercase text-rose-400">
          Delete Account
        </Text>
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
