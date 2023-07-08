import { router } from "../trpc";
import { bloodPressureRouter } from "./bloodPressure";
import { weightRouter } from "./weight";
import { heightRouter } from "./height";
import { reportsRouter } from "./reports";
import { accountRouter } from "./account";

export const appRouter = router({
  account: accountRouter,
  bloodPressure: bloodPressureRouter,
  weight: weightRouter,
  height: heightRouter,
  reports: reportsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
