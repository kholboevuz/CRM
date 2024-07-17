import {
  Body,
  Controller,
  FileTypeValidator,
  HttpCode,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { StudentDto } from './dto/users.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @HttpCode(201)
  @Post('add-student')
  @UseInterceptors(FileInterceptor('photo'))
  async registerStudenet(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: 'jpg|jpeg|png|gif' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() student: StudentDto,
  ) {
    return await this.userService.registerStudent(student, file.filename);
  }

  @HttpCode(200)
  @Post('students')
  async getStudet() {
    return await this.userService.getStudent();
  }
}
