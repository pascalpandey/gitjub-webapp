import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const keyRouter = createTRPCRouter({
  getByUser: privateProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findUnique({
      where: {
        id: ctx.userId,
      },
      select: {
        repositories: true
      }
    });
  }),
});
