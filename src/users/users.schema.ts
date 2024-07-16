import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop({ required: true })
  fullname: string;
  @Prop({ unique: true, required: true })
  phone: number;
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(Users);
