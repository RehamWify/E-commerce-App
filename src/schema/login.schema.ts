import * as z from "zod";

export const loginSchema = z
  .object({
    email: z.email("invalid email"),
    password: z.string().min(6, "min length 6").max(20, "max length 20"),
  })

export type LoginSchemaType = z.infer<typeof loginSchema>