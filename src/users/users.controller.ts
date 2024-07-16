import { Controller, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @HttpCode(200)
  @Post('students')
  async getStudet() {
    return 'Hello world';
  }
}
