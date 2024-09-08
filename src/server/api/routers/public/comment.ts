import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const commentRouter = createTRPCRouter({
  retrieveCommentsByUserID: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      return ctx.prisma.comment.findMany({
        where: {
          userId: input.id,
        },
      });
    }),

  retrieveCommentsByProductID: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      return ctx.prisma.comment.findMany({
        where: {
          productId: input.id,
        },
      });
    }),
});
