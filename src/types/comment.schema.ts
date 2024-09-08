import { z } from "zod";

export const commentSchema = z.object({
  comment: z.string(),
  rating: z.number(),
  productId: z.string(),
});
