import React, { FC } from "react";
import { View } from "react-native";
import { trpc } from "@acme/utils";
import { Button } from "@acme/ui";
import Carousel from "react-native-snap-carousel";

export const Create: FC = () => {
  const utils = trpc.useContext();

  const drinksQuery = trpc.water.getDrinks.useQuery();

  const createMutation = trpc.water.create.useMutation({
    onSuccess: () => {
      utils.water.invalidate();
    },
  });

  const handleCreate = async (id: number) => {
    createMutation.mutate({ amount: 8, drinkId: id });
  };

  return (
    <View className="absolute bottom-4 w-full">
      <Carousel
        data={drinksQuery.data}
        renderItem={(drink: any) => {
          return (
            <View className="flex flex-col items-center justify-center">
              <Button
                text={drink.name}
                onPress={() => handleCreate(drink.id)}
              />
            </View>
          );
        }}
        sliderWidth={50}
        itemWidth={36}
      />
    </View>
  );
};
