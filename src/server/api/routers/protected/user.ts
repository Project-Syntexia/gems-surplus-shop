import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { userSchema } from "@/types/user.schema";

export const userRouter = createTRPCRouter({
  /**
   * This is in Private procedure because
   *
   * login type is only Google, this will make
   *
   * sure that the user is exists.
   */
  createUser: privateProcedure
    .input(userSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.user.create({
        data: {
          userId: ctx.userId,
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
