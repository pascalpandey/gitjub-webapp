import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import axios from "axios";

interface DirItem {
  path: string;
  isDirectory: boolean;
}

type DirResponse = Array<DirItem>;
type EntryResponse = DirResponse | string | JSON;

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
  getBranchOverview: privateProcedure
    .input(
      z.object({ userId: z.string(), repoName: z.string(), branch: z.string() })
    )
    .query(async ({ input }) => {
      const response = await axios.get<DirResponse>(
        `${process.env.GIT_SERVER_IP as string}/${input.userId}/${
          input.repoName
        }.git/${input.branch}`
      );
      return response.data;
    }),
  getBranchEntry: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        repoName: z.string(),
        branch: z.string(),
        path: z.string(),
      })
    )
    .query(async ({ input }) => {
      const response = await axios.get<EntryResponse>(
        `${process.env.GIT_SERVER_IP as string}/${input.userId}/${
          input.repoName
        }.git/${input.branch}/${input.path}`
      );
      console.log(response.data, typeof(response.data))
      return response.data;
    }),
});
