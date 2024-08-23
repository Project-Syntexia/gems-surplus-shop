import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";

const commentSchema = z.object({
  comment: z.string(),
  rating: z.number(),
  productId: z.string(),
});

export const commentsRouter = createTRPCRouter({
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
