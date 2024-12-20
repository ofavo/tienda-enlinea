import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../product/entities/product.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({ description: 'Nombre del usuario' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Correo electrónico del usuario' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ description: 'Contraseña del usuario' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ description: 'Lista de productos en la lista de deseos' })
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }] })
  wishlist: MongooseSchema.Types.ObjectId[];

  @ApiProperty({ enum: UserRole, description: 'Rol del usuario' })
  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @ApiProperty({ description: 'Fecha de registro' })
  @Prop({ type: Date, default: Date.now })
  registrationDate: Date;

  @ApiProperty({ description: 'Fecha de creación' })
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización' })
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
