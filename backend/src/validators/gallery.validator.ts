import { z } from 'zod';

export const createGallerySchema = z.object({
  fotoUrl: z.string().url(),
  format: z.string().default('image/jpeg'),
  altText: z.string().optional(),
  tanggalUnggah: z.coerce.date().optional(),
  width: z.coerce.number().int().positive().optional(),
  height: z.coerce.number().int().positive().optional(),
});

export const updateGallerySchema = createGallerySchema.partial();

export type CreateGalleryInput = z.infer<typeof createGallerySchema>;
export type UpdateGalleryInput = z.infer<typeof updateGallerySchema>;
