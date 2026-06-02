import { z } from 'zod';

export const dusunSpasialSchema = z.object({
  namaDusun: z.string().min(1),
  deskripsiZona: z.string().optional(),
  koordinatDusun: z.string().optional(),
  titikPenting: z.array(z.string()).optional(),
  urutan: z.coerce.number().int().nonnegative().optional(),
});

export const jarakAksesSchema = z.object({
  destinasi: z.string().min(1),
  jarakKm: z.coerce.number().nonnegative(),
  urutan: z.coerce.number().int().nonnegative().optional(),
});

export const updateGeografisSchema = z.object({
  koordinat: z.string().min(1).optional(),
  ketinggian: z.string().min(1).optional(),
  kodepos: z.string().min(1).optional(),
  kodeKemendagri: z.string().min(1).optional(),
  batasUtara: z.string().min(1).optional(),
  batasTimur: z.string().min(1).optional(),
  batasSelatan: z.string().min(1).optional(),
  batasBarat: z.string().min(1).optional(),
  googleMapsEmbedUrl: z.string().url().optional().or(z.literal('')),
  dusun: z.array(dusunSpasialSchema).optional(),
  jarakAkses: z.array(jarakAksesSchema).optional(),
});

export type UpdateGeografisInput = z.infer<typeof updateGeografisSchema>;
