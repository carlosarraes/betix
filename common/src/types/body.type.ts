import { z } from 'zod'

const passwordSchema = z
  .string()
  .refine((data) => data.length >= 8, { message: 'Password must be at least 8 characters long' })

export const BodySchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: passwordSchema,
})

export type BodyType = z.infer<typeof BodySchema>
