import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "../trpc";

const cartSchema = z.object({
  productId: z.string(),
});

// TODO: Convert the procedure into Admin only for mutations

export const cartsRouter = createTRPCRouter({
  createProduct: privateProcedure
    .input(cartSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.cart.create({
        data: {
          productId: input.productId,
          userId: ctx.userId,
        },
      });
    }),

  createManyProduct: privateProcedure
    .input(z.array(cartSchema))
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.cart.createMany({
        data: input.map((value) => ({ ...value, userId: ctx.userId })),
      });
      return result.count;
    }),

  fetchCartDetailByProductId: privateProcedure
    .input(cartSchema)
    .query(async ({ input, ctx }) => {
      return ctx.prisma.cart.findFirst({
        where: {
          productId: input.productId,
          userId: ctx.userId,
        },
      });
    }),

  deleteProduct: privateProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.cart.delete({
        where: {
          id: input,
        },
      });
    }),
});
