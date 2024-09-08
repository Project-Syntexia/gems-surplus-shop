import { z } from "zod";

export const productImageSchema = z.object({
  alternateText: z.string(),
  customBorder: z.string(),
  isHidden: z.boolean(),
  orderNumber: z.number(),
  source: z.string(),
});

export const productSchema = z.object({
  id: z.string(),
  brand: z.string(),
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
  images: z.array(productImageSchema),
  modifiedDate: z.date(),
  name: z.string(),
  quality: z.enum(["LIKE_BRAND_NEW", "SLIGHTLY_USED", "USED"]),
  quantity: z.number(),
  price: z.object({
    value: z.number(),
    currency: z.enum(["PHP", "USD"]),
  }),
});
