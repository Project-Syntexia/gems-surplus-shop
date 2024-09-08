import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";

export const productRouter = createTRPCRouter({
  updateRating: privateProcedure
    .input(
      z.object({
        id: z.string(),
        totalRating: z.number(),
        numberOfRating: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      return ctx.prisma.product.update({
        data: {
          // Prisma Atomic operation is not working, using this atm
          ratings: {
            totalRating: input.totalRating,
            numberOfRating: input.numberOfRating,
          },
        },
        where: {
          id: input.id,
        },
      });
    }),
});
