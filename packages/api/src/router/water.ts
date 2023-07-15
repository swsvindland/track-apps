import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { format } from "date-fns";

export const waterRouter = router({
  getDrinks: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.drink.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
  }),
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.userWater.findMany({
      where: { userId: ctx.auth.userId },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  graph: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.userWater.findMany({
      where: {
        userId: ctx.auth.userId,
        createdAt: { gte: new Date(format(new Date(), "yyyy/MM/dd")) },
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        drink: true,
      },
    });
  }),

  single: protectedProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.userWater.findUnique({
      where: {
        id: input,
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        amount: z.number(),
        drinkId: z.bigint(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.userWater.create({
        data: {
          amount: input.amount,
          drinkId: input.drinkId,
          userId: ctx.auth.userId,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.bigint(),
        amount: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.userWater.update({
        where: {
          id: input.id,
        },
        data: {
          amount: input.amount,
        },
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.bigint(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.userWater.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
