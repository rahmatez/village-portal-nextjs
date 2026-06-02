import { z } from 'zod';

const money = z.coerce.number().nonnegative();

export const pendapatanItemSchema = z.object({
  namaPos: z.string().min(1),
  nominal: money,
});

export const belanjaItemSchema = z.object({
  namaBidang: z.string().min(1),
  nominal: money,
  persentase: z.coerce.number().min(0).max(100),
});

export const createApbSchema = z.object({
  tahun: z.coerce.number().int().min(2000).max(2100),
  totalPendapatan: money,
  totalBelanja: money,
  pembiayaan: money,
  silpa: money,
  pendapatan: z.array(pendapatanItemSchema).optional(),
  belanja: z.array(belanjaItemSchema).optional(),
});

export const updateApbSchema = createApbSchema.partial();

export type CreateApbInput = z.infer<typeof createApbSchema>;
export type UpdateApbInput = z.infer<typeof updateApbSchema>;
