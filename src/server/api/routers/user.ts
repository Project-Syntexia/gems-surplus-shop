import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";

const userSchema = z.object({
  phoneNumber: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
  }),
  gender: z.enum(["MALE", "FEMALE"]),
  name: z.string(),
});

export const usersRouter = createTRPCRouter({
  createUser: privateProcedure
    .input(userSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.user.create({
        data: {
          id: ctx.userId,
          phoneNumber: input.phoneNumber,
          address: input.address,
          gender: input.gender,
          name: input.name,
        },
      });
    }),

  updateUser: privateProcedure
    .input(userSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.user.update({
        data: {
          phoneNumber: input.phoneNumber,
          address: input.address,
          gender: input.gender,
          name: input.name,
        },
        where: {
          id: ctx.userId,
        },
      });
    }),
});
