import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.schema';

@Module({
  providers: [UsersService, AuthService],
  controllers: [UsersController, AuthController],
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
    AuthModule,
  ],
})
export class UsersModule {}
