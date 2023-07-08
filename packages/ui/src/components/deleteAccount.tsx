import React, { FC, useState } from "react";
import { View } from "react-native";
import Dialog from "react-native-dialog";
import { trpc } from "@acme/utils";
import { useAuth } from "@clerk/clerk-expo";
import { Button } from "./button";

export const DeleteAccount: FC = () => {
  const { signOut } = useAuth();
  const [visible, setVisible] = useState(false);

  const deleteMutation = trpc.account.deleteAccount.useMutation({
    onSuccess: () => {
      setVisible(false);
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
      <Button
        onPress={() => showDialog()}
        text="Delete Account"
        variant="secondary"
        fullWidth
      />
      <Dialog.Container visible={visible}>
        <Dialog.Title>Account delete</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this account? This will delete all data, from
          all track applications. You cannot undo this action.
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Delete" onPress={handleDelete} />
      </Dialog.Container>
    </View>
  );
};
