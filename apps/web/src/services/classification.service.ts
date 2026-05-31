import { api } from './api';

export interface ClassificationRequest {
  imageUrl: string;
  binId?: string;
  userTelegramId?: string;
}

export interface ClassificationCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface ClassificationResponse {
  id: string;
  result: string;
  category: ClassificationCategory;
  confidence: number;
  description: string;
  pointsEarned: number;
  totalPoints: number;
  binColor: string;
  binIcon: string;
}

export const classificationService = {
  async classify(data: ClassificationRequest): Promise<ClassificationResponse> {
    return api.post('/classifications', data);
  },
};
