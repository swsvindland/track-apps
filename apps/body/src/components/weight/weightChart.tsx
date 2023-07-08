import { Dimensions, Text, useColorScheme, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { trpc } from "@acme/utils";
import { FC, useMemo, useState } from "react";
import { format } from "date-fns";

export const WeightChart: FC = () => {
  const colorScheme = useColorScheme();
  // react-native-chart-kit does not export its data type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);

  const userWeightsQuery = trpc.weight.graph.useQuery();

  useMemo(() => {
    const labels = userWeightsQuery.data?.map((item) =>
      format(new Date(item.createdAt), "MM/dd"),
    );

    setData({
      labels,
      datasets: [
        {
          data: userWeightsQuery.data?.map((item) => item.weight) ?? [],
          color: () => "#d946ef", // optional
        },
      ],
      legend: ["Weight"],
    });
  }, [userWeightsQuery.data]);

  if (userWeightsQuery.isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text className="text-center text-lg font-bold dark:text-white">
        Weights
      </Text>
      {(userWeightsQuery.data?.length ?? 0) > 0 ? (
        <LineChart
          data={data}
          width={Dimensions.get("window").width - 16} // from react-native
          height={220}
          yAxisInterval={1} // optional, defaults to 1
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
          }}
        />
      ) : (
        <Text>Use the Add button to add your blood pressure</Text>
      )}
    </View>
  );
};
