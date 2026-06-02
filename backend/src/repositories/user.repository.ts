import { prisma } from '../config/database';
import { Role } from '@prisma/client';

export const userRepository = {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, role: true, isActive: true, createdAt: true },
    });
  },

  create(data: { email: string; password: string; name: string; role?: Role }) {
    return prisma.user.create({
      data,
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
  },
};
