import { z } from "zod";

import { adminProcedure, createTRPCRouter } from "@/server/api/trpc";
import { productSchema } from "@/types/product.schema";

const defaultRatings = {
  totalRating: 0,
  numberOfRating: 0,
};

export const productRouter = createTRPCRouter({
  createProduct: adminProcedure
    .input(
      productSchema.omit({ id: true, createdDate: true, modifiedDate: true }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.product.create({
        data: {
          brand: input.brand,
          category: input.category,
          description: input.description,
          images: input.images,
          name: input.name,
          price: input.price,
          ratings: defaultRatings,
          quality: input.quality,
          quantity: input.quantity,
        },
      });
    }),

  createManyProduct: adminProcedure
    .input(z.array(productSchema))
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.product.createMany({
        data: input.map((productDetails) => ({
          ...productDetails,
          ratings: defaultRatings,
        })),
      });
      return result.count;
    }),

  updateProduct: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .input(productSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.product.update({
        data: {
          brand: input.brand,
          description: input.description,
          images: input.images,
          name: input.name,
          price: input.price,
          quality: input.quality,
          quantity: input.quantity,
        },
        where: {
          id: input.id,
        },
      });
    }),

  adjustStocksOfProduct: adminProcedure
    .input(
      z.object({
        id: z.string(),
        quantity: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.product.update({
        data: {
          quantity: input.quantity,
        },
        where: {
          id: input.id,
        },
      });
    }),

  deleteProduct: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.product.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
