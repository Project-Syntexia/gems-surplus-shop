import { z } from "zod";

export const productImageSchema = z.object({
  alternateText: z.string(),
  customBorder: z.string(),
  isHidden: z.boolean(),
  orderNumber: z.number(),
  source: z.string(),
});

export const categoryEnum = z.enum([
  "ELECTRONICS",
  "FASHION",
  "FURNITURE",
  "HARDWARE_ITEM",
  "MEDIA",
  "TOYS_AND_HOBBIES",
]);

export const productSchema = z.object({
  id: z.string(),
  brand: z.string(),
  category: categoryEnum,
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

export const categoryNoFilter = "NO_FILTER";

export type CategoryEnumType = z.infer<typeof categoryEnum>;
export type CategoryWithNoFilterType =
  | CategoryEnumType
  | typeof categoryNoFilter;
export type ProductType = z.infer<typeof productSchema>;
