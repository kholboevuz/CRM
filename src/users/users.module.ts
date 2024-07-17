import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.schema';
import { StudentSchema } from './student.schema';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  providers: [UsersService, AuthService],
  controllers: [UsersController, AuthController],
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: './upload/public',
          filename: (req, file, callback) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            const extension = extname(file.originalname);
            callback(null, `${uniqueSuffix}${extension}`);
          },
        }),
      }),
    }),
    MongooseModule.forFeature([
      { name: 'Users', schema: UserSchema },
      { name: 'Student', schema: StudentSchema },
    ]),
    AuthModule,
  ],
})
export class UsersModule {}
