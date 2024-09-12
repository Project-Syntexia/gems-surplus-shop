import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { categoryEnum } from "@/types/product.schema";

export const productRouter = createTRPCRouter({
  fetchProductById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      return ctx.prisma.product.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  fetchProducts: publicProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      return ctx.prisma.product.findMany({
        orderBy: {
          createdDate: "desc",
        },
        take: input,
      });
    }),

  fetchProductsByCategory: publicProcedure
    .input(
      z.object({
        category: categoryEnum.array().element,
        limit: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      return ctx.prisma.product.findMany({
        orderBy: {
          createdDate: "desc",
        },
        where: {
          category: {
            equals: input.category,
          },
        },
        take: input.limit,
      });
    }),
});
