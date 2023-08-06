import React, { FC, useState } from "react";
import { Modal, View, Platform, Dimensions } from "react-native";
import { trpc } from "@acme/utils";
import { PlusIcon } from "react-native-heroicons/outline";
import { Button } from "@acme/ui";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

export const Create: FC = () => {
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState("");

  // const [state, setState] = useState<State>({
  //   systolic: undefined,
  //   diastolic: undefined,
  //   heartRate: undefined,
  // });

  // const createMutation = trpc.bloodPressure.create.useMutation({
  //   onSuccess: () => {
  //     setVisible(false);
  //     utils.bloodPressure.invalidate();
  //   },
  // });

  const showDialog = () => {
    setVisible(true);
  };

  const optionsQuery = trpc.food.autocomplete.useQuery({
    query,
  });

  console.log(optionsQuery.data);

  return (
    <View className="absolute bottom-4 right-4">
      <Button
        icon={<PlusIcon color="white" />}
        text="Create"
        onPress={() => showDialog()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}
      >
        <View className="flex-1 bg-white">
          <View className="h-screen p-4">
            <View className="z-10 mt-16 flex-1">
              <AutocompleteDropdown
                initialValue={undefined} // or just '2'
                direction={Platform.select({ ios: "down" })}
                debounce={600}
                onChangeText={setQuery}
                dataSet={[
                  { id: "1", title: "Alpha" },
                  { id: "2", title: "Beta" },
                  { id: "3", title: "Gamma" },
                ]}
                loading={optionsQuery.isLoading}
              />
            </View>
            <View className="flex-grow" />
            <View className="flex-1">
              <Button onPress={() => setVisible(false)} text="Close" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
