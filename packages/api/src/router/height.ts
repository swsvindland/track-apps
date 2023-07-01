import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { clerkClient } from "@clerk/nextjs/server";

export const heightRouter = router({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.userHeight.findMany({
      where: { userId: ctx.auth.userId },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  graph: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.userHeight.findMany({
      take: 5,
      where: { userId: ctx.auth.userId },
      orderBy: {
        createdAt: "asc",
      },
    });
  }),

  single: protectedProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.userHeight.findUnique({
      where: {
        id: input,
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        height: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.userHeight.create({
        data: {
          height: input.height,
          userId: ctx.auth.userId,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.bigint(),
        height: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.userHeight.update({
        where: {
          id: input.id,
        },
        data: {
          height: input.height,
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
      return ctx.prisma.userHeight.delete({
        where: {
          id: input.id,
        },
      });
    }),

  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    await clerkClient.users.deleteUser(ctx.auth.userId);

    return ctx.prisma.userHeight.deleteMany({
      where: {
        userId: ctx.auth.userId,
      },
    });
  }),
});
