import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const keyRouter = createTRPCRouter({
  upsertKey: privateProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.upsert({
        where: {
          id: ctx.userId,
        },
        update: {
          sshKey: input,
        },
        create: {
          id: ctx.userId,
          sshKey: input,
        },
      });
    }),
  getKey: privateProcedure.query(async ({ ctx }) => {
    if (ctx.userId) {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.userId,
        },
      });
      return user?.sshKey;
    }
  }),
});
