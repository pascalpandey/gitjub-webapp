import { createTRPCRouter } from "~/server/api/trpc";
import { keyRouter } from "~/server/api/routers/key";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  key: keyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
