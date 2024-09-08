import { z } from "zod";

export const userSchema = z.object({
  phoneNumber: z.object({
    countryCode: z.number(),
    value: z.string(),
  }),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
  }),
  gender: z.enum(["MALE", "FEMALE"]),
  name: z.string(),
});
