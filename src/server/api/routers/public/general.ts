import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { SHOP_NAME } from "@/utils/const";
import { ItemsCategoryEnum } from "@prisma/client";

export const generalRouter = createTRPCRouter({
  initialSettings: publicProcedure.query(async ({ ctx }) => {
    const itemCategories = Object.keys(
      ItemsCategoryEnum,
    ) as (keyof typeof ItemsCategoryEnum)[];
    const filter = {
      select: {
        _all: true,
      },
    } as const;
    const date = new Date();
    date.setDate(1);

    const totalProducts = await ctx.prisma.product.count(filter);
    const totalUsers = await ctx.prisma.user.count(filter);
    const newArrivals = await ctx.prisma.product.findMany({
      where: {
        createdDate: {
          gte: date,
        },
      },
    });

    return {
      itemCategories,
      shopName: SHOP_NAME,
      totalProducts: totalProducts._all,
      totalUsers: totalUsers._all,
      newArrivals,
    };
  }),
});
