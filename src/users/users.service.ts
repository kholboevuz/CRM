import { Injectable } from '@nestjs/common';
import { UserDocument, Users } from './users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { StudentDto } from './dto/users.dto';
import { Student, StudentDocumnet } from './student.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Student.name)
    private studentModel: Model<StudentDocumnet>,
  ) {}

  async registerStudent(student: StudentDto, file: string) {
    const _data = await this.studentModel.findOne({ phone: student.phone });
    if (_data)
      return { success: false, message: 'Bunday foydalanavuvchi mavjud' };

    const data = await this.studentModel.create({
      fullname: student.fullname,
      password: student.password,
      phone: student.phone,
      photo: file,
    });
    return {
      success: true,
      message: "Student muvaffaqiyatli ro'yxatdan o'tdi",
      data: data,
    };
  }

  async getStudent() {
    const data = await this.studentModel.find({});
    return {
      success: true,
      data,
    };
  }
}
