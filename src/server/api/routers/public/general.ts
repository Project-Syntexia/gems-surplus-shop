import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { ItemsCategoryEnum } from "@prisma/client";

export const generalRouter = createTRPCRouter({
  initialSettings: publicProcedure.query(async ({ input, ctx }) => {
    const itemCategories = Object.keys(
      ItemsCategoryEnum,
    ) as (keyof typeof ItemsCategoryEnum)[];
    return {
      itemCategories,
    };
  }),
});
