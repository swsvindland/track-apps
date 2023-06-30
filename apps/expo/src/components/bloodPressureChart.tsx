import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { trpc } from "../utils/trpc";
import { FC, useMemo, useState } from "react";
import { format } from "date-fns";

export const BloodPressureChart: FC = () => {
  const [data, setData] = useState<any>(null);

  const userBloodPressureQuery = trpc.bloodPressure.graph.useQuery();

  useMemo(() => {
    const labels = userBloodPressureQuery.data?.map((item) =>
      format(new Date(item.createdAt), "PP"),
    );

    setData({
      labels,
      datasets: [
        {
          data: userBloodPressureQuery.data?.map((item) => item.systolic) ?? [],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        },
        {
          data:
            userBloodPressureQuery.data?.map((item) => item.diastolic) ?? [],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        },
      ],
    });
  }, [userBloodPressureQuery.data]);

  if (userBloodPressureQuery.isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text className="text-center text-lg font-bold">Blood Pressure</Text>
      {(userBloodPressureQuery.data?.length ?? 0) > 0 ? (
        <LineChart
          data={data}
          width={Dimensions.get("window").width - 32} // from react-native
          height={220}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
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
