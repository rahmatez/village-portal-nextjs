import { Router } from 'express';
import authRoutes from './auth.routes';
import beritaRoutes from './berita.routes';
import produkRoutes from './produk.routes';
import pengaduanRoutes from './pengaduan.routes';
import statistikRoutes from './statistik.routes';
import profilSosialRoutes from './profil-sosial.routes';
import pemerintahanRoutes from './pemerintahan.routes';
import galleryRoutes from './gallery.routes';
import apbDesaRoutes from './apb-desa.routes';
import geografisRoutes from './geografis.routes';
import postsRoutes from './posts.routes';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'API Desa Mindaka berjalan' });
});

router.use('/auth', authRoutes);
router.use('/berita', beritaRoutes);
router.use('/produk', produkRoutes);
router.use('/pengaduan', pengaduanRoutes);
router.use('/statistik', statistikRoutes);
router.use('/profil-sosial', profilSosialRoutes);
router.use('/pemerintahan', pemerintahanRoutes);
router.use('/gallery', galleryRoutes);
router.use('/apb-desa', apbDesaRoutes);
router.use('/geografis', geografisRoutes);
router.use('/posts', postsRoutes);

export default router;
