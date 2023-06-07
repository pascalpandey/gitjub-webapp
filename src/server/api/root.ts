import { createTRPCRouter } from "~/server/api/trpc";
import { keyRouter } from "~/server/api/routers/key";
import { userRouter } from "./routers/user";
import { repoRouter } from "./routers/repo";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  key: keyRouter,
  user: userRouter,
  repo: repoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
