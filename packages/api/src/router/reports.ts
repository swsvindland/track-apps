import { router, protectedProcedure } from "../trpc";
import { closestTo } from "date-fns";

export const reportsRouter = router({
  // TODO: Metric
  bmi: protectedProcedure.query(async ({ ctx }) => {
    const heights = await ctx.prisma.userHeight.findMany({
      take: 5,
      where: { userId: ctx.auth.userId },
      orderBy: {
        createdAt: "asc",
      },
    });

    const weights = await ctx.prisma.userWeight.findMany({
      take: 5,
      where: { userId: ctx.auth.userId },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (heights.length === 0 || weights.length === 0) {
      return [];
    }

    const bmis = weights.map((weight, index) => {
      const height = closestTo(
        weight.createdAt,
        heights.map((h) => h.createdAt),
      );

      const indexOfHeight = heights.findIndex((h) => h.createdAt === height);

      const bmi =
        weight.weight / (heights?.at(indexOfHeight)?.height ?? 1) ** 2;

      return {
        bmi: bmi * 703,
        createdAt: weight.createdAt,
      };
    });

    return bmis;
  }),
});
