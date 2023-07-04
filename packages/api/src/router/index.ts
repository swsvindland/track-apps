import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { bloodPressureRouter } from "./bloodPressure";
import { weightRouter } from "./weight";
import { heightRouter } from "./height";
import { reportsRouter } from "./reports";

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  bloodPressure: bloodPressureRouter,
  weight: weightRouter,
  height: heightRouter,
  reports: reportsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
