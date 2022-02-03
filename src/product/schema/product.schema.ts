import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

import { User } from 'src/user/schema/user.schema';

export type ProductDocument = Product & Document;

@Schema({ versionKey: false, timestamps: true })
export class Product extends Document {
  @Prop({ type: String, required: true, trim: true, uppercase: true })
  name: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  owner: User;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
