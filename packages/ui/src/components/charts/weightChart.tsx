import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { trpc } from "@acme/utils";
import { FC, useMemo, useState } from "react";
import { format } from "date-fns";
import { LoadingChart } from "../loading";

export const WeightChart: FC = () => {
  const isLargeScreen = Dimensions.get("window").width > 640;
  const width = isLargeScreen
    ? Dimensions.get("window").width / 2 - 16
    : Dimensions.get("window").width - 16;
  // react-native-chart-kit does not export its data type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);

  const query = trpc.weight.graph.useQuery();

  useMemo(() => {
    if (!query.data) return;

    const labels = query.data?.map((item) =>
      format(new Date(item.createdAt), "MM/dd"),
    );

    setData({
      labels,
      datasets: [
        {
          data: query.data?.map((item) => item.weight) ?? [],
          color: () => "#F7C619", // optional
        },
      ],
      legend: ["Weight"],
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
      <Text className="text-center text-lg font-bold text-secondary">
        Weights
      </Text>
      <LineChart
        data={data}
        width={width} // from react-native
        height={220}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#2E586A",
          backgroundGradientFrom: "#2E586A",
          backgroundGradientTo: "#2E586A",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: () => "#F7C619",
          labelColor: () => "#F7C619",
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};
