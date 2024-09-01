import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const productSchema = z.object({
  id: z.string(),
  category: z.enum([
    "ELECTRONICS",
    "FASHION",
    "FURNITURE",
    "HARDWARE_ITEM",
    "MEDIA",
    "TOYS_AND_HOBBIES",
  ]),
  createdDate: z.date(),
  description: z.string(),
  imageSrc: z.string(),
  modifiedDate: z.date(),
  name: z.string(),
  quality: z.enum(["LIKE_BRAND_NEW", "SLIGHTLY_USED", "USED"]),
  quantity: z.number(),
  price: z.object({
    value: z.number(),
    currency: z.enum(["PHP", "USD"]),
  }),
});

// TODO: Convert the procedure into Admin only for mutations

export const productsRouter = createTRPCRouter({
  createProduct: privateProcedure
    .input(productSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.product.create({
        data: {
          name: input.name,
          description: input.description,
          category: input.category,
          imageSrc: input.imageSrc,
          price: input.price,
          quantity: input.quantity,
          quality: input.quality,
        },
      });
    }),

  createManyProduct: privateProcedure
    .input(z.array(productSchema))
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.product.createMany({
        data: input,
      });
      return result.count;
    }),

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

  updateProduct: privateProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .input(productSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.product.update({
        data: {
          name: input.name,
          description: input.description,
          imageSrc: input.imageSrc,
          price: input.price,
          quantity: input.quantity,
          quality: input.quality,
        },
        where: {
          id: input.id,
        },
      });
    }),

  deleteProduct: privateProcedure
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
