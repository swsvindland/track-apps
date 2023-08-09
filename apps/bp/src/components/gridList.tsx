import { FC, useMemo, useState } from "react";
import { trpc } from "@acme/utils";
import { Pressable, ScrollView, Text, View } from "react-native";
import { format } from "date-fns";
import { Edit } from "./edit";
import { LoadingGridItems } from "@acme/ui";

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
    return <LoadingGridItems />;
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
          className="my-4 rounded-2xl bg-card p-4 shadow dark:bg-neutral-700"
        >
          <Text className="text-xl font-bold text-secondary">
            {format(item.createdAt, "PP")}
          </Text>
          <View className="my-2 border border-b border-gray-300" />
          <View className="flex flex-row items-center">
            <Text className="mr-2 text-lg font-bold text-secondary">
              Systolic:
            </Text>
            <Text className="text-lg text-ternary">{item.systolic}</Text>
          </View>
          <View className="flex flex-row items-center">
            <Text className="mr-2 text-lg font-bold text-secondary">
              Diastolic:
            </Text>
            <Text className="text-lg text-ternary">{item.diastolic}</Text>
          </View>
          <View className="flex flex-row items-center">
            <Text className="mr-2 text-lg font-bold text-secondary">
              Heart Rate:
            </Text>
            <Text className="text-lg text-ternary">{item.heartRate}</Text>
          </View>
        </Pressable>
      ))}
      {selected ? (
        <Edit visible={visible} setVisible={setVisible} selected={selected} />
      ) : null}
    </ScrollView>
  );
};
