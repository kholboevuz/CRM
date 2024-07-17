import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StudentDocumnet = HydratedDocument<Student>;

@Schema()
export class Student {
  @Prop({ required: true })
  fullname: string;
  @Prop({ required: true, unique: true })
  phone: string;
  @Prop({ required: true })
  photo: string;
  @Prop({ required: true })
  password: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
