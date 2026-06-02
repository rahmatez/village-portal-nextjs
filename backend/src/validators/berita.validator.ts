import { z } from 'zod';

export const createBeritaSchema = z.object({
  title: z.string().min(3, 'Judul minimal 3 karakter'),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug hanya huruf kecil, angka, dan strip'),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(10, 'Konten minimal 10 karakter'),
  imageUrl: z.string().url().optional().or(z.literal('')),
  isPublished: z.boolean().optional(),
});

export const updateBeritaSchema = createBeritaSchema.partial();

export type CreateBeritaInput = z.infer<typeof createBeritaSchema>;
export type UpdateBeritaInput = z.infer<typeof updateBeritaSchema>;
