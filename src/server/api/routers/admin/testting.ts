import { adminProcedure, createTRPCRouter } from "@/server/api/trpc";

export const testingRouter = createTRPCRouter({
  testing: adminProcedure.mutation(async ({ ctx }) => {
    return ctx.prisma.product.updateMany({
      data: {
        images: [
          {
            alternateText: "Corgi",
            isHidden: false,
            orderNumber: 0,
            source:
              "https://www.akc.org/wp-content/uploads/2017/11/Pembroke-Welsh-Corgi-standing-outdoors-in-the-fall.jpg",
            customBorder: "",
          },
        ],
      },
      where: {
        id: { not: "66de9d936baba94e6a12db33" },
        AND: [
          {
            id: { not: "66dac44804d14df29ac98e4e" },
          },
        ],
      },
    });
  }),
});
