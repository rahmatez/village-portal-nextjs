import { z } from 'zod';

export const updateKependudukanSchema = z.object({
  jumlahPendudukTotal: z.coerce.number().int().nonnegative(),
  jumlahLakiLaki: z.coerce.number().int().nonnegative(),
  jumlahPerempuan: z.coerce.number().int().nonnegative(),
  persenUsiaProduktif: z.coerce.number().min(0).max(100),
  persenLansia: z.coerce.number().min(0).max(100),
  sumberPendapatan: z.array(z.string()).optional(),
  asetDesa: z.array(z.string()).optional(),
});

export const demografiItemSchema = z.object({
  id: z.string().optional(),
  jenis: z.enum(['UMUR', 'JENIS_KELAMIN', 'PENDIDIKAN']),
  kelompok: z.string().min(1),
  persentase: z.coerce.number().min(0).max(100),
  jumlah: z.coerce.number().int().nonnegative().optional(),
  urutan: z.coerce.number().int().nonnegative().optional(),
});

export const replaceDemografiSchema = z.object({
  items: z.array(demografiItemSchema).min(1),
});

export const fasilitasItemSchema = z.object({
  id: z.string().optional(),
  tipe: z.enum(['KESEHATAN', 'PENDIDIKAN', 'UMUM']),
  nama: z.string().min(1),
  jumlah: z.coerce.number().int().nonnegative().default(1),
  keterangan: z.string().optional(),
  urutan: z.coerce.number().int().nonnegative().optional(),
});

export const replaceFasilitasSchema = z.object({
  items: z.array(fasilitasItemSchema).min(1),
});

export const mataPencaharianItemSchema = z.object({
  id: z.string().optional(),
  namaProfesi: z.string().min(1),
  jumlah: z.coerce.number().int().nonnegative(),
  persentase: z.coerce.number().min(0).max(100),
  urutan: z.coerce.number().int().nonnegative().optional(),
});

export const replaceMataPencaharianSchema = z.object({
  items: z.array(mataPencaharianItemSchema).min(1),
});

export type UpdateKependudukanInput = z.infer<typeof updateKependudukanSchema>;
export type ReplaceDemografiInput = z.infer<typeof replaceDemografiSchema>;
export type ReplaceFasilitasInput = z.infer<typeof replaceFasilitasSchema>;
export type ReplaceMataPencaharianInput = z.infer<typeof replaceMataPencaharianSchema>;
