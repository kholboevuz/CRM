import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../dto/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async userLogin(@Body() data: UserDto) {
    return this.authService.userLogin(data);
  }

  @HttpCode(200)
  @Post('register')
  async registerUser(@Body() data: UserDto) {
    return this.authService.userRegister(data);
  }
}
