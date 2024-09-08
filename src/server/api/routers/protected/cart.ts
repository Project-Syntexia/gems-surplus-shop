import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { cartSchema } from "@/types/cart.schema";

export const cartRouter = createTRPCRouter({
  addToCart: privateProcedure
    .input(cartSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.cart.create({
        data: {
          productId: input.productId,
          quantity: input.quantity,
          userId: ctx.userId,
        },
      });
    }),

  addToCartManyProduct: privateProcedure
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

  fetchCartList: privateProcedure.query(async ({ ctx }) => {
    return ctx.prisma.cart.findMany({
      where: {
        userId: ctx.userId,
      },
      orderBy: {
        id: "desc",
      },
    });
  }),

  deleteCartProduct: privateProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.cart.delete({
        where: {
          id: input,
        },
      });
    }),
});
