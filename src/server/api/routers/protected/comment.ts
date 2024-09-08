import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { commentSchema } from "@/types/comment.schema";

export const commentRouter = createTRPCRouter({
  postComment: privateProcedure
    .input(commentSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.comment.create({
        data: {
          comment: input.comment,
          rating: input.rating,
          productId: input.productId,
          userId: ctx.userId,
        },
      });
    }),

  retrieveSelfComments: privateProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      return ctx.prisma.comment.findMany({
        take: input,
        orderBy: {},
        where: {
          userId: ctx.userId,
        },
      });
    }),
});
