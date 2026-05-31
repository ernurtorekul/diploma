import { api } from './api';

export const binService = {
  async findAll() {
    return api.get('/bins');
  },

  async findOne(id: string) {
    return api.get(`/bins/${id}`);
  },

  async findByQrCode(qrCode: string) {
    const bins = await api.get('/bins');
    return bins.data.find((bin: any) => bin.qrCode === qrCode);
  },
};
