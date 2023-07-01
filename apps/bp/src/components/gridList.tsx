import { FC, useMemo, useState } from "react";
import { trpc } from "../utils/trpc";
import { Pressable, ScrollView, Text, View } from "react-native";
import { format } from "date-fns";
import { Edit } from "./edit";

export interface BloodPressure {
  id: bigint;
  systolic: number;
  diastolic: number;
  heartRate: number | null;
}

export const GridList: FC = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<BloodPressure | undefined>(
    undefined,
  );

  const userBloodPressureQuery = trpc.bloodPressure.all.useQuery();

  useMemo(() => {
    if (selected && !visible) {
      setSelected(undefined);
    }
  }, [visible]);

  if (userBloodPressureQuery.isLoading) {
    return <Text>Loading...</Text>;
  }

  const handleEdit = (item: BloodPressure) => {
    setSelected(item);
    setVisible(true);
  };

  return (
    <ScrollView>
      {userBloodPressureQuery.data?.map((item) => (
        <Pressable
          key={item.id.toString()}
          onPress={() => handleEdit(item)}
          className="my-4 rounded-2xl bg-white p-4 shadow dark:bg-neutral-700"
        >
          <Text className="text-xl font-bold dark:text-white">
            {format(item.createdAt, "PP")}
          </Text>
          <View className="my-2 border border-b border-gray-300" />
          <View className="flex flex-row items-center">
            <Text className="mr-2 text-lg font-bold dark:text-white">
              Systolic:
            </Text>
            <Text className="text-lg dark:text-white">{item.systolic}</Text>
          </View>
          <View className="flex flex-row items-center">
            <Text className="mr-2 text-lg font-bold dark:text-white">
              Diastolic:
            </Text>
            <Text className="text-lg dark:text-white dark:text-white">
              {item.diastolic}
            </Text>
          </View>
          <View className="flex flex-row items-center">
            <Text className="mr-2 text-lg font-bold dark:text-white">
              Heart Rate:
            </Text>
            <Text className="text-lg dark:text-white">{item.heartRate}</Text>
          </View>
        </Pressable>
      ))}
      {selected ? (
        <Edit visible={visible} setVisible={setVisible} selected={selected} />
      ) : null}
    </ScrollView>
  );
};
