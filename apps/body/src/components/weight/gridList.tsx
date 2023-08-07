import { FC, useMemo, useState } from "react";
import { trpc } from "@acme/utils";
import { Pressable, ScrollView, Text, View } from "react-native";
import { format } from "date-fns";
import { Edit } from "./edit";

export interface Weight {
  id: bigint;
  weight: number;
}

export const GridList: FC = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<Weight | undefined>(undefined);

  const userWeightsQuery = trpc.weight.all.useQuery();

  useMemo(() => {
    if (selected && !visible) {
      setSelected(undefined);
    }
  }, [visible]);

  if (userWeightsQuery.isLoading) {
    return <Text>Loading...</Text>;
  }

  const handleEdit = (item: Weight) => {
    setSelected(item);
    setVisible(true);
  };

  return (
    <ScrollView>
      {userWeightsQuery.data?.map((item) => (
        <Pressable
          key={item.id.toString()}
          onPress={() => handleEdit(item)}
          className="my-4 rounded-2xl bg-card p-4 shadow dark:bg-neutral-700"
        >
          <Text className="text-xl font-bold text-secondary">
            {format(item.createdAt, "PP")}
          </Text>
          <View className="my-2 border border-b border-gray-300" />
          <View className="flex flex-row items-center">
            <Text className="mr-2 text-lg font-bold text-secondary">
              Weight:
            </Text>
            <Text className="text-lg text-ternary">{item.weight}</Text>
          </View>
        </Pressable>
      ))}
      {selected ? (
        <Edit visible={visible} setVisible={setVisible} selected={selected} />
      ) : null}
    </ScrollView>
  );
};
