import bcrypt from 'bcryptjs';
import { userRepository } from '../repositories/user.repository';
import { signToken } from '../utils/jwt';
import { AppError } from '../middlewares/error.middleware';
import { LoginInput, RegisterInput } from '../validators/auth.validator';

export const authService = {
  async login(input: LoginInput) {
    const user = await userRepository.findByEmail(input.email);
    if (!user || !user.isActive) {
      throw new AppError(401, 'Email atau password salah');
    }

    const valid = await bcrypt.compare(input.password, user.password);
    if (!valid) {
      throw new AppError(401, 'Email atau password salah');
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  },

  async register(input: RegisterInput) {
    const existing = await userRepository.findByEmail(input.email);
    if (existing) {
      throw new AppError(409, 'Email sudah terdaftar');
    }

    const hashed = await bcrypt.hash(input.password, 12);
    const user = await userRepository.create({
      email: input.email,
      password: hashed,
      name: input.name,
      role: input.role,
    });

    return user;
  },

  async getProfile(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError(404, 'User tidak ditemukan');
    }
    return user;
  },

  async listUsers() {
    return userRepository.findMany();
  },
};
