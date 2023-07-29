import { router } from "../trpc";
import { bloodPressureRouter } from "./bloodPressure";
import { weightRouter } from "./weight";
import { heightRouter } from "./height";
import { reportsRouter } from "./reports";
import { accountRouter } from "./account";
import { waterRouter } from "./water";
import { foodRouter } from "./food";

export const appRouter = router({
  account: accountRouter,
  bloodPressure: bloodPressureRouter,
  food: foodRouter,
  weight: weightRouter,
  height: heightRouter,
  reports: reportsRouter,
  water: waterRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
