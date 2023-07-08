import { protectedProcedure, router } from "../trpc";
import { clerkClient } from "@clerk/nextjs/server";

export const accountRouter = router({
  deleteAccount: protectedProcedure.mutation(async ({ ctx }) => {
    await clerkClient.users.deleteUser(ctx.auth.userId);

    await ctx.prisma.userBloodPressure.deleteMany({
      where: {
        userId: ctx.auth.userId,
      },
    });

    await ctx.prisma.userHeight.deleteMany({
      where: {
        userId: ctx.auth.userId,
      },
    });

    await ctx.prisma.userWeight.deleteMany({
      where: {
        userId: ctx.auth.userId,
      },
    });

    await ctx.prisma.userSettings.deleteMany({
      where: {
        userId: ctx.auth.userId,
      },
    });
  }),
});
