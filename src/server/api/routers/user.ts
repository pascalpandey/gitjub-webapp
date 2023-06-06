import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({});
    return users;
  }),
  createUser: privateProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.user.create({
        data: {
          imageUrl: ctx.imageUrl,
          id: ctx.userId,
          sshKey: input,
        },
      });
    }),
  getById: privateProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.prisma.user.findUnique({
      where: {
        id: input,
      },
    });
  }),
  getSelf: privateProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findUnique({
      where: {
        id: ctx.userId,
      },
    });
  }),
});
