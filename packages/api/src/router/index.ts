import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { bloodPressureRouter } from "./bloodPressure";
import { bodyRouter } from "./body";

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  bloodPressure: bloodPressureRouter,
  body: bodyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
