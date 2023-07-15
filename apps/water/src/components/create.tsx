import React, { FC } from "react";
import { Dimensions, View } from "react-native";
import { trpc } from "@acme/utils";
import { Button } from "@acme/ui";
// Cannot find types for this package
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Carousel from "react-native-snap-carousel";

export const Create: FC = () => {
  const utils = trpc.useContext();

  const drinksQuery = trpc.water.getDrinks.useQuery();

  const createMutation = trpc.water.create.useMutation({
    onSuccess: () => {
      utils.water.invalidate();
    },
  });

  const handleCreate = async (id: bigint) => {
    createMutation.mutate({ amount: 8, drinkId: id });
  };

  return (
    <View className="absolute bottom-4 w-full">
      <Carousel
        data={drinksQuery.data}
        renderItem={(drink: {
          index: number;
          item: { name: string; id: bigint };
        }) => {
          return (
            <Button
              text={drink.item.name}
              onPress={() => handleCreate(drink.item.id)}
            />
          );
        }}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={200}
      />
    </View>
  );
};
