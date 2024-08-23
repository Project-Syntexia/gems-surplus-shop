import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";

export const mongodbRouter = createTRPCRouter({
  createUser: privateProcedure
    .input(
      z.object({
        phoneNumber: z.string(),
        address: z.object({
          street: z.string(),
          city: z.string(),
          state: z.string(),
          zip: z.string(),
        }),
        gender: z.enum(["MALE", "FEMALE"]),
        name: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.user.create({
        data: {
          phoneNumber: input.phoneNumber,
          address: input.address,
          gender: input.gender,
          name: input.name,
        },
      });
    }),

  //   create: publicProcedure
  //     .input(z.object({ name: z.string().min(1) }))
  //     .mutation(async ({ input }) => {
  //       const post: Post = {
  //         id: posts.length + 1,
  //         name: input.name,
  //       };
  //       posts.push(post);
  //       return post;
  //     }),

  //   getLatest: publicProcedure.query(() => {
  //     return posts.at(-1) ?? null;
  //   }),
});
