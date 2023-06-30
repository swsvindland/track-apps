import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const bloodPressureRouter = router({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.userBloodPressure.findMany({
      where: { userId: ctx.auth.userId },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        systolic: z.number(),
        diastolic: z.number(),
        heartRate: z.number().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.userBloodPressure.create({
        data: {
          systolic: input.systolic,
          diastolic: input.diastolic,
          heartRate: input.heartRate,
          userId: ctx.auth.userId,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        systolic: z.number(),
        diastolic: z.number(),
        heartRate: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.userBloodPressure.update({
        where: {
          id: input.id,
        },
        data: {
          systolic: input.systolic,
          diastolic: input.diastolic,
          heartRate: input.heartRate,
        },
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.userBloodPressure.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
