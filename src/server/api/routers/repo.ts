import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { Axios } from "axios";

export const repoRouter = createTRPCRouter({
  getByUser: privateProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const data = await ctx.prisma.user.findUnique({
        where: {
          id: input,
        },
        select: {
          authoredRepositories: true,
        },
      });
      return data?.authoredRepositories;
    }),
  // getByPath: privateProcedure.input(z.object(userId:))
});
