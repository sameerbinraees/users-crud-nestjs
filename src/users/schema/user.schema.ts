import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({
    required: true,
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    uniqueCaseInsensitive: true,
  })
  email: string;

  @Prop({ required: true, type: String })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
