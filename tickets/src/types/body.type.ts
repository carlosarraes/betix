import { z } from 'zod'

export const BodySchema = z.object({
  title: z.string().nonempty({ message: 'Title is required' }),
  price: z.number().positive({ message: 'Price must be greater than 0' }),
})

export type BodyType = z.infer<typeof BodySchema>
