import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { clerkClient } from "@clerk/nextjs/server";

export const weightRouter = router({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.userWeight.findMany({
      where: { userId: ctx.auth.userId },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  graph: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.userWeight.findMany({
      take: 5,
      where: { userId: ctx.auth.userId },
      orderBy: {
        createdAt: "asc",
      },
    });
  }),

  single: protectedProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.userWeight.findUnique({
      where: {
        id: input,
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        weight: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.userWeight.create({
        data: {
          weight: input.weight,
          userId: ctx.auth.userId,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.bigint(),
        weight: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.userWeight.update({
        where: {
          id: input.id,
        },
        data: {
          weight: input.weight,
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
      return ctx.prisma.userWeight.delete({
        where: {
          id: input.id,
        },
      });
    }),

  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    await clerkClient.users.deleteUser(ctx.auth.userId);

    return ctx.prisma.userWeight.deleteMany({
      where: {
        userId: ctx.auth.userId,
      },
    });
  }),
});
