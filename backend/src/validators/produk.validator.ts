import { z } from 'zod';

export const createProdukSchema = z.object({
  name: z.string().min(2, 'Nama produk minimal 2 karakter'),
  description: z.string().optional(),
  price: z.coerce.number().positive('Harga harus positif'),
  imageUrl: z.string().url().optional().or(z.literal('')),
  ownerName: z.string().optional(),
  contact: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const updateProdukSchema = createProdukSchema.partial();

export type CreateProdukInput = z.infer<typeof createProdukSchema>;
export type UpdateProdukInput = z.infer<typeof updateProdukSchema>;
