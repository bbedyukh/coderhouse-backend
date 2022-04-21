import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop()
  firstName: string

  @Prop()
  lastName: string

  @Prop()
  email: string

  @Prop()
  password: string

  @Prop()
  username: string

  @Prop()
  phone: string

  @Prop()
  address: string

  @Prop()
  age: number
}

export const UserSchema = SchemaFactory.createForClass(User)