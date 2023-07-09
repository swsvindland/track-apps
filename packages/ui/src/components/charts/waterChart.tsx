import { Dimensions, Text, useColorScheme, View } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { trpc } from "@acme/utils";
import { FC, useMemo, useState } from "react";

export const WaterChart: FC = () => {
  const colorScheme = useColorScheme();
  // react-native-chart-kit does not export its data type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);

  const query = trpc.water.graph.useQuery();

  useMemo(() => {
    if (!query.data) return;

    setData({
      labels: ["Swim", "Bike", "Run"], // optional
      data: [0.4, 0.6, 0.8],
    });
  }, [query.data]);

  if (query.isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!query.data || query.data.length === 0) {
    return null;
  }

  return (
    <View>
      <Text className="text-center text-lg font-bold dark:text-white">
        Water
      </Text>
      <ProgressChart
        data={data}
        width={Dimensions.get("window").width - 16} // from react-native
        height={220}
        strokeWidth={16}
        radius={32}
        hideLegend={false}
        chartConfig={{
          backgroundColor: colorScheme === "dark" ? "#404040" : "#fff",
          backgroundGradientFrom: colorScheme === "dark" ? "#404040" : "#fff",
          backgroundGradientTo: colorScheme === "dark" ? "#404040" : "#fff",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: () => (colorScheme === "dark" ? "#fff" : "#000"),
          labelColor: () => (colorScheme === "dark" ? "#fff" : "#000"),
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: colorScheme === "dark" ? "#fff" : "#000",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          shadowColor: "#000",
        }}
      />
    </View>
  );
};
