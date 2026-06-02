import { z } from 'zod';

export const updateWilayahSchema = z.object({
  luasWilayah: z.string().min(1),
  jumlahDusun: z.coerce.number().int().nonnegative(),
  totalRw: z.coerce.number().int().nonnegative(),
  totalRt: z.coerce.number().int().nonnegative(),
  daftarDusun: z.array(z.string()).optional(),
});

export const perangkatSchema = z.object({
  nama: z.string().min(2),
  jabatan: z.string().min(2),
  fotoUrl: z.string().url().optional().or(z.literal('')),
  orderPriority: z.coerce.number().int().nonnegative().optional(),
});

export const updatePerangkatSchema = perangkatSchema.partial();

export type UpdateWilayahInput = z.infer<typeof updateWilayahSchema>;
export type PerangkatInput = z.infer<typeof perangkatSchema>;
export type UpdatePerangkatInput = z.infer<typeof updatePerangkatSchema>;
