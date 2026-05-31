import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('leaderboard')
  async getLeaderboard() {
    const leaderboard = await this.usersService.getLeaderboard();
    return {
      data: leaderboard,
      message: 'Leaderboard retrieved successfully',
    };
  }

  @Get(':telegramId')
  async findOne(@Param('telegramId') telegramId: string) {
    const user = await this.usersService.findByTelegramId(telegramId);
    return {
      data: user,
      message: 'User retrieved successfully',
    };
  }
}
