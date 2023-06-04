import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const repoRouter = createTRPCRouter({
  upsertKey: publicProcedure
    .input(z.object({ userId: z.string(), sshKey: z.string().nullable() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.upsert({
        where: {
          id: input.userId,
        },
        update: {
          sshKey: input.sshKey,
        },
        create: {
          id: input.userId,
          sshKey: input.sshKey,
        },
      });
    }),
});
