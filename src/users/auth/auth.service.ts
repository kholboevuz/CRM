import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, Users } from '../users.schema';
import { Model } from 'mongoose';
import { UserDto } from '../dto/users.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UserDocument>,
  ) {}

  async userLogin(data: UserDto) {
    const { phone, password } = data;
    const isData = await this.userModel.findOne({ phone });
    if (!isData) return { success: false, message: 'Login yoki parol xato' };
    const isMatchPassword = await bcrypt.compare(password, isData.password);
    if (isMatchPassword) {
      const token = jwt.sign(
        {
          data: isData.phone,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' },
      );
      return {
        success: true,
        data: isData,
        token,
      };
    } else {
      return { success: false, message: 'Login yoki parol xato' };
    }
  }

  async userRegister(data: UserDto) {
    const { password, fullname, phone } = data;
    const _data = await this.userModel.findOne({ phone });
    if (_data)
      return { success: false, message: 'Bunday foydalanuvchi mavjud' };
    const hash = await bcrypt.hash(password, 12);
    const reqData = await this.userModel.create({
      password: hash,
      fullname,
      phone,
    });
    return {
      success: true,
      message: "Muvaffaqiyatli ro'yxatdan o'tdingiz",
      data: reqData,
    };
  }
}
