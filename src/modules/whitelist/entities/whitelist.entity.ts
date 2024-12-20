import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';

export type WhitelistDocument = Whitelist & Document;

export enum WhitelistStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Schema({ timestamps: true })
export class Whitelist {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: MongooseSchema.Types.ObjectId;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }] })
  products: MongooseSchema.Types.ObjectId[];

  @Prop({
    type: String,
    enum: WhitelistStatus,
    default: WhitelistStatus.ACTIVE,
  })
  status: WhitelistStatus;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const WhitelistSchema = SchemaFactory.createForClass(Whitelist);
