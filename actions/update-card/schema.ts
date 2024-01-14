import { z } from 'zod';

export const UpdateCardSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title is required',
    })
    .min(3, {
      message: 'Title is too short',
    }),
  id: z.string(),
  boardId: z.string(),
  description: z.optional(
    z
      .string({
        required_error: 'Description is required',
        invalid_type_error: 'Description is required',
      })
      .min(3, 'Description is too short')
  ),
});
