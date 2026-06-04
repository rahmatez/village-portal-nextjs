import { z } from 'zod';

export const updateStatistikSchema = z.object({
  jumlahPenduduk: z.coerce.number().int().nonnegative().optional(),
  jumlahKK: z.coerce.number().int().nonnegative().optional(),
  jumlahDusun: z.coerce.number().int().nonnegative().optional(),
  statusIDM: z.string().optional(),
  skorIKS: z.coerce.number().min(0).max(1).optional(),
  skorIKE: z.coerce.number().min(0).max(1).optional(),
  skorIKL: z.coerce.number().min(0).max(1).optional(),
  jumlahTokoUMKM: z.coerce.number().int().nonnegative().optional(),
  ppidResponHari: z.coerce.number().int().positive().optional(),
  ppidKepuasan: z.coerce.number().min(0).max(100).optional(),
  ppidEmail: z.string().email().optional().or(z.literal('')),
  visi: z.string().optional(),
  misi: z.array(z.string()).optional(),
  sejarahDesa: z.string().optional(),
});

export type UpdateStatistikInput = z.infer<typeof updateStatistikSchema>;
