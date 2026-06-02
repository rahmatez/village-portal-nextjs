import { pengaduanRepository } from '../repositories/pengaduan.repository';
import { AppError } from '../middlewares/error.middleware';
import { CreatePengaduanInput, UpdatePengaduanStatusInput } from '../validators/pengaduan.validator';
import { generateTicketCode } from '../utils/ticketCode';

export const pengaduanService = {
  async list() {
    return pengaduanRepository.findMany();
  },

  async getByTicket(ticketCode: string) {
    const pengaduan = await pengaduanRepository.findByTicket(ticketCode);
    if (!pengaduan) {
      throw new AppError(404, 'Pengaduan tidak ditemukan');
    }
    return pengaduan;
  },

  async create(input: CreatePengaduanInput) {
    return pengaduanRepository.create({
      ticketCode: generateTicketCode(),
      name: input.name,
      email: input.email || null,
      phone: input.phone || null,
      subject: input.subject,
      message: input.message,
    });
  },

  async updateStatus(id: string, handlerId: string, input: UpdatePengaduanStatusInput) {
    const pengaduan = await pengaduanRepository.findById(id);
    if (!pengaduan) {
      throw new AppError(404, 'Pengaduan tidak ditemukan');
    }

    return pengaduanRepository.update(id, {
      status: input.status,
      response: input.response,
      handledBy: { connect: { id: handlerId } },
    });
  },
};
