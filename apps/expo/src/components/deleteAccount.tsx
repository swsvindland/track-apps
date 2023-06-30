import React, { FC, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Dialog from "react-native-dialog";

export const DeleteAccount: FC = () => {
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setVisible(false);
  };

  return (
    <View>
      <Pressable
        className="flex w-full items-center justify-center rounded-2xl bg-red-500 p-4 shadow-2xl"
        onPress={() => showDialog()}
      >
        <Text className="text-white">DeleteAccount</Text>
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
