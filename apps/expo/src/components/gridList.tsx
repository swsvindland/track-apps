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
          className="my-4 rounded-2xl bg-white p-4 shadow"
        >
          <Text className="text-xl font-bold">
            {format(item.createdAt, "PP")}
          </Text>
          <View className="my-2 border border-b border-gray-300" />
          <View className="flex flex-row items-center">
            <Text className="mr-2 text-lg font-bold">Systolic:</Text>
            <Text className="text-lg">{item.systolic}</Text>
          </View>
          <View className="flex flex-row items-center">
            <Text className="mr-2 text-lg font-bold">Diastolic:</Text>
            <Text className="text-lg">{item.diastolic}</Text>
          </View>
          <View className="flex flex-row items-center">
            <Text className="mr-2 text-lg font-bold">Heart Rate:</Text>
            <Text className="text-lg">{item.heartRate}</Text>
          </View>
        </Pressable>
      ))}
      {selected ? (
        <Edit visible={visible} setVisible={setVisible} selected={selected} />
      ) : null}
    </ScrollView>
  );
};
