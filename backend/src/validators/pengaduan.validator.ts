import { z } from 'zod';

export const createPengaduanSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid').optional().or(z.literal('')),
  phone: z.string().min(10, 'Nomor telepon tidak valid').optional(),
  subject: z.string().min(5, 'Subjek minimal 5 karakter'),
  message: z.string().min(20, 'Pesan minimal 20 karakter'),
});

export const updatePengaduanStatusSchema = z.object({
  status: z.enum(['PENDING', 'DIPROSES', 'SELESAI', 'DITOLAK']),
  response: z.string().optional(),
});

export type CreatePengaduanInput = z.infer<typeof createPengaduanSchema>;
export type UpdatePengaduanStatusInput = z.infer<typeof updatePengaduanStatusSchema>;
