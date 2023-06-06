import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const keyRouter = createTRPCRouter({
  upsertKey: privateProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.update({
        where: {
          id: ctx.userId,
        },
        data: {
          sshKey: input,
        },
      });
    }),
  getKey: privateProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.userId,
      },
    });
    return user?.sshKey;
  }),
});
