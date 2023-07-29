import { protectedProcedure, router } from "../trpc";
import {
  bodyFat,
  computeBMI,
  getMacrosBF,
  getMacrosBMI,
  tryParseFloat,
  tryParseInt,
} from "../utils";
import { authFatSecret } from "../authFatSecret";
import axios from "axios";
import * as z from "zod";

export const foodRouter = router({
  getMacros: protectedProcedure.query(async ({ ctx }) => {
    const weight = await ctx.prisma.userWeight.findFirst({
      where: {
        userId: ctx.auth.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const height = await ctx.prisma.userHeight.findFirst({
      where: {
        userId: ctx.auth.userId,
      },
    });

    const body = await ctx.prisma.userBody.findFirst({
      where: {
        userId: ctx.auth.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const settings = await ctx.prisma.userSettings.findFirst({
      where: {
        userId: ctx.auth.userId,
      },
    });

    if (!height?.height || !weight?.weight) {
      return undefined;
    }

    const bmi = computeBMI(height.height, weight.weight);

    if (!body || !settings) {
      return getMacrosBMI(bmi, weight.weight);
    }

    const bf = bodyFat(
      settings.sex,
      body.naval,
      body.hips,
      body.neck,
      height.height,
    );

    return getMacrosBF(settings.sex, bf, weight.weight);
  }),
  getFoodFromFatSecret: protectedProcedure.query(async ({ ctx }) => {
    const food = await ctx.prisma.food.findFirst({
      where: {
        id: 1407,
      },
      include: {
        servings: true,
      },
    });

    if (food) {
      return food;
    }

    const token = await authFatSecret();

    const params = {
      method: "food.get.v2",
      food_id: 1407,
      format: "json",
      include_sub_categories: true,
    };

    const response = await axios.post(
      "https://platform.fatsecret.com/rest/server.api",
      null,
      {
        params,
        headers: { Authorization: `Bearer ${token.data.access_token}` },
      },
    );

    await ctx.prisma.food.upsert({
      where: {
        id: parseInt(response.data.food.food_id),
      },
      update: {
        name: response.data.food.food_name,
      },
      create: {
        id: parseInt(response.data.food.food_id),
        name: response.data.food.food_name,
        category: response.data.food.food_type,
      },
    });

    for (const serving of response.data.food.servings.serving) {
      await ctx.prisma.serving.upsert({
        where: {
          id: tryParseInt(serving.serving_id),
        },
        update: {},
        create: {
          id: tryParseInt(serving.serving_id),
          addedSugar: tryParseFloat(serving.added_sugars),
          calcium: tryParseFloat(serving.calcium),
          calories: tryParseFloat(serving.calories),
          carbohydrate: tryParseFloat(serving.carbohydrate),
          cholesterol: tryParseFloat(serving.cholesterol),
          fat: tryParseFloat(serving.fat),
          fiber: tryParseFloat(serving.fiber),
          iron: tryParseFloat(serving.iron),
          measurementDescription: serving.measurement_description,
          metricServingAmount: tryParseFloat(serving.metric_serving_amount),
          metricServingUnit: serving.metric_serving_unit,
          numberOfUnits: tryParseFloat(serving.number_of_units),
          monoUnsaturatedFat: tryParseFloat(serving.monounsaturated_fat),
          polyUnsaturatedFat: tryParseFloat(serving.polyunsaturated_fat),
          potassium: tryParseFloat(serving.potassium),
          protein: tryParseFloat(serving.protein),
          saturatedFat: tryParseFloat(serving.saturated_fat),
          servingDescription: serving.serving_description,
          sodium: tryParseFloat(serving.sodium),
          sugar: tryParseFloat(serving.sugar),
          transFat: tryParseFloat(serving.transFat),
          vitaminA: tryParseFloat(serving.vitamin_a),
          vitaminC: tryParseFloat(serving.vitamin_c),
          vitaminD: tryParseFloat(serving.vitamin_d),
          foodId: tryParseInt(response.data.food.food_id),
        },
      });
    }
  }),
  getUserFood: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.userFood.findMany({
      where: {
        userId: ctx.auth.userId,
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
      include: {
        food: true,
        serving: true,
      },
    });
  }),
  autocomplete: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }): Promise<string[]> => {
      const token = await authFatSecret();

      const params = {
        method: "foods.autocomplete",
        expression: input.query,
        format: "json",
      };

      const response = await axios.post(
        "https://platform.fatsecret.com/rest/server.api",
        null,
        {
          params,
          headers: {
            Authorization: `Bearer ${token.data.access_token}`,
          },
        },
      );

      return response.data?.suggestions?.suggestion ?? [];
    }),
});
