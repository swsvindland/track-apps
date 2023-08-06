import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { trpc } from "@acme/utils";
import { FC, useMemo, useState } from "react";
import { format } from "date-fns";

export const BmiChart: FC = () => {
  // react-native-chart-kit does not export its data type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);

  const query = trpc.reports.bmi.useQuery();

  useMemo(() => {
    if (!query.data) return;

    const labels = query.data?.map((item) =>
      format(new Date(item.createdAt), "MM/dd"),
    );

    setData({
      labels,
      datasets: [
        {
          data:
            query.data
              ?.filter((item) => item.bmi != null)
              .map((item) => item.bmi) ?? [],
          color: () => "#F7C619", // optional
        },
      ],
      legend: ["BMI"],
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
      <Text className="text-center text-lg font-bold text-secondary">BMI</Text>
      <LineChart
        data={data}
        width={Dimensions.get("window").width - 16} // from react-native
        height={220}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#2E586A",
          backgroundGradientFrom: "#2E586A",
          backgroundGradientTo: "#2E586A",
          decimalPlaces: 2, // optional, defaults to 2dp
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
