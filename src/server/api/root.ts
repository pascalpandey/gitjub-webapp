import { createTRPCRouter } from "~/server/api/trpc";
import { repoRouter } from "~/server/api/routers/repo";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  repo: repoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
