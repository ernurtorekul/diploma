import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import OpenAI from 'openai';

interface ClassifyImageDto {
  imageUrl: string;
  binId?: string;
  userTelegramId?: string;
}

@Injectable()
export class ClassificationsService {
  private openai: OpenAI;

  constructor(private prisma: PrismaService) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });
  }

  async create(dto: ClassifyImageDto) {
    try {
      // Get all available categories for classification
      const categories = await this.prisma.binCategory.findMany({
        select: { name: true },
      });

      const categoryNames = categories.map(c => c.name);

      if (categoryNames.length === 0) {
        throw new Error('No categories available for classification');
      }

      // For demo: mock classification if no OpenAI key or on error
      let result: any;
      if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('your-')) {
        // Return a random category for demo purposes
        const randomCategory = categoryNames[Math.floor(Math.random() * categoryNames.length)];
        result = {
          category: randomCategory,
          confidence: 0.85 + Math.random() * 0.14,
          description: `Этот предмет, похоже, ${randomCategory.toLowerCase()}. Пожалуйста, проверьте и утилизируйте соответствующим образом.`,
        };
      } else {
        try {
          // Real AI classification using all available categories
          const response = await this.openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
              {
                role: 'user',
                content: [
                  {
                    type: 'image_url',
                    image_url: { url: dto.imageUrl },
                  },
                  {
                    type: 'text',
                    text: `You are a waste classification assistant. Analyze this image and classify it into ONE of these categories: ${categoryNames.join(', ')}.

IMPORTANT: Return ONLY valid JSON, no markdown, no additional text. Your response must be ONLY this JSON structure:
{
  "category": "Exact category name from: ${categoryNames.join(', ')}",
  "confidence": 0.85,
  "description": "Краткая инструкция по утилизации на русском языке"
}

Rules:
- "category" MUST be exactly one of: ${categoryNames.join(', ')}
- "confidence" must be a number between 0.0 and 1.0
- "description" must be in Russian language`,
                  },
                ],
              },
            ],
            max_tokens: 300,
            temperature: 0.3,
          });

          const content = response.choices[0].message.content || '{}';
          console.log('OpenAI raw response:', content);

          // Try to parse JSON, fall back if it fails
          try {
            // Remove markdown code blocks if present
            let jsonContent = content.trim();
            if (jsonContent.includes('```')) {
              const match = jsonContent.match(/```(?:json)?\s*(\{.*?\})\s*```/s);
              if (match) {
                jsonContent = match[1];
              }
            }

            result = JSON.parse(jsonContent);
            console.log('Parsed result:', result);

            // Validate the result has required fields
            if (!result.category || typeof result.category !== 'string') {
              throw new Error('Invalid or missing category in response');
            }
          } catch (parseError) {
            console.error('JSON parse error:', parseError);
            // Use fallback if JSON parsing fails
            const randomCategory = categoryNames[Math.floor(Math.random() * categoryNames.length)];
            result = {
              category: randomCategory,
              confidence: 0.70,
              description: `Не удалось получить ответ от ИИ. Предполагаемый тип: ${randomCategory}.`,
            };
          }
        } catch (openaiError) {
          console.error('OpenAI API error:', openaiError);
          // Fallback to mock classification on OpenAI error
          const randomCategory = categoryNames[Math.floor(Math.random() * categoryNames.length)];
          result = {
            category: randomCategory,
            confidence: 0.75,
            description: `Не удалось проанализировать изображение с помощью ИИ. Предполагаемый тип: ${randomCategory}. Пожалуйста, проверьте и выберите правильный контейнер.`,
          };
        } finally {
          // Log the result for debugging
          console.log('Classification result:', result);
          console.log('Available categories:', categoryNames);
        }
      }

      // Find the category that was classified
      const classifiedCategory = await this.prisma.binCategory.findFirst({
        where: { name: result.category },
      });

      if (!classifiedCategory) {
        throw new Error(`Category "${result.category}" not found in database`);
      }

      // Find or create user
      let user;
      if (dto.userTelegramId) {
        user = await this.prisma.user.upsert({
          where: { telegramId: dto.userTelegramId },
          update: {},
          create: {
            telegramId: dto.userTelegramId,
            ecoPoints: 0,
          },
        });
      }

      // Determine which bin to use
      let targetBinId = dto.binId;
      if (!targetBinId) {
        // Find a bin that matches the classified category
        const matchingBin = await this.prisma.bin.findFirst({
          where: {
            categoryId: classifiedCategory.id,
          },
        });

        if (!matchingBin) {
          throw new Error(`No bins found for category "${classifiedCategory.name}"`);
        }
        targetBinId = matchingBin.id;
      }

      // Create classification
      const classification = await this.prisma.classification.create({
        data: {
          imageUrl: dto.imageUrl,
          result: result.category,
          confidence: result.confidence,
          pointsEarned: 10,
          binId: targetBinId,
          userId: user?.id,
        },
      });

      // Update user points
      let totalPoints = 0;
      if (user) {
        const updatedUser = await this.prisma.user.update({
          where: { id: user.id },
          data: { ecoPoints: { increment: 10 } },
        });
        totalPoints = updatedUser.ecoPoints;
      }

      return {
        id: classification.id,
        result: result.category,
        category: {
          id: classifiedCategory.id,
          name: classifiedCategory.name,
          color: classifiedCategory.color,
          icon: classifiedCategory.icon,
        },
        confidence: result.confidence,
        description: result.description,
        pointsEarned: 10,
        totalPoints,
        binColor: classifiedCategory.color,
        binIcon: classifiedCategory.icon,
      };
    } catch (error) {
      console.error('Classification error:', error);
      throw error;
    }
  }

  async findAll() {
    return this.prisma.classification.findMany({
      include: {
        bin: { include: { category: true } },
        user: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
