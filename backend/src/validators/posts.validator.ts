import { z } from 'zod';

export const createPostSchema = z.object({
  judul: z.string().min(3),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  konten: z.string().min(10),
  excerpt: z.string().max(500).optional(),
  fotoSampul: z.string().url().optional().or(z.literal('')),
  tanggalRilis: z.coerce.date().optional(),
  waktuBaca: z.coerce.number().int().positive().optional(),
  status: z.enum(['draft', 'published']).optional(),
});

export const updatePostSchema = createPostSchema.partial();

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
