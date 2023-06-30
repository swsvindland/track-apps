import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const bloodPressureRouter = router({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.userBloodPressure.findMany({
      where: { userId: ctx.auth.userId },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        systolic: z.number(),
        diastolic: z.number(),
        heartRate: z.number(),
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
});
