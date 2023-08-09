import { Dimensions, Text, useColorScheme, View } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { trpc } from "@acme/utils";
import { FC, useMemo, useState } from "react";
import { LoadingChart } from "../loading";

export const WaterChart: FC = () => {
  const colorScheme = useColorScheme();
  // react-native-chart-kit does not export its data type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);

  const query = trpc.water.graph.useQuery();

  useMemo(() => {
    if (!query.data) return;

    let hydration = 0;
    let caffeine = 0;
    let calories = 0;

    query.data.forEach((item) => {
      hydration +=
        (item.drink.hydration * (item.amount / item.drink.servingSize)) / 64;
      caffeine +=
        (item.drink.caffeine * (item.amount / item.drink.servingSize)) / 400;
      calories +=
        (item.drink.calories * (item.amount / item.drink.servingSize)) / 100;
    });

    setData({
      labels: ["Calories", "Caffeine", "Hydration"], // optional
      data: [calories, caffeine, hydration],
    });
  }, [query.data]);

  if (query.isLoading) {
    return <LoadingChart />;
  }

  if (!query.data || query.data.length === 0) {
    return null;
  }

  return (
    <View className="w-full sm:w-1/2">
      <Text className="text-center text-lg font-bold dark:text-white">
        Water
      </Text>
      <ProgressChart
        data={data}
        width={Dimensions.get("window").width - 16} // from react-native
        height={220}
        strokeWidth={16}
        radius={32}
        hideLegend
        chartConfig={{
          backgroundColor: colorScheme === "dark" ? "#404040" : "#fff",
          backgroundGradientFrom: colorScheme === "dark" ? "#404040" : "#fff",
          backgroundGradientTo: colorScheme === "dark" ? "#404040" : "#fff",
          color: (opacity = 1, index) => {
            if (index === 0) {
              return `rgba(244, 63, 94, ${opacity})`;
            }
            if (index === 1) {
              return `rgba(245, 158, 11, ${opacity})`;
            }
            return `rgba(20, 184, 166, ${opacity})`;
          },
          labelColor: () => (colorScheme === "dark" ? "#fff" : "#000"),
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <View className="flex flex-row items-center justify-center gap-8">
        <View className="flex flex-row items-center justify-center">
          <View className="mr-2 h-6 w-6 rounded-full bg-teal-500" />
          <Text>Hydration</Text>
        </View>
        <View className="flex flex-row items-center justify-center">
          <View className="mr-2 h-6 w-6 rounded-full bg-amber-500" />
          <Text>Caffeine</Text>
        </View>
        <View className="flex flex-row items-center justify-center">
          <View className="mr-2 h-6 w-6 rounded-full bg-rose-500" />
          <Text>Calories</Text>
        </View>
      </View>
    </View>
  );
};
