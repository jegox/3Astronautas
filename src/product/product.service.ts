import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProductDTO, UpdateProductDTO } from './dto/product.dto';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(
    payload: CreateProductDTO,
    owner: any,
  ): Promise<ProductDocument> {
    return await this.productModel.create({ ...payload, owner });
  }

  async getAll(owner: any): Promise<ProductDocument[]> {
    return await this.productModel
      .find({ owner })
      .populate('owner', { password: 0, createdAt: 0, updatedAt: 0 })
      .sort({ _id: -1 });
  }

  async update(
    _id: any,
    payload: UpdateProductDTO,
    owner: any,
  ): Promise<ProductDocument> {
    return await this.productModel.findOneAndUpdate(
      { _id, owner },
      { $set: payload },
      { returnDocument: 'after' },
    );
  }

  async remove(_id: any, owner: any): Promise<boolean> {
    const { deletedCount } = await this.productModel.deleteOne({ _id, owner });
    return !!deletedCount;
  }
}
