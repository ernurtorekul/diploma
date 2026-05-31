import { api } from './api';

export const userService = {
  async getLeaderboard() {
    return api.get('/users/leaderboard');
  },

  async findByTelegramId(telegramId: string) {
    return api.get(`/users/${telegramId}`);
  },
};
