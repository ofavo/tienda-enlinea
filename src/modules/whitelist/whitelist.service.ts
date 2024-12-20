import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { CreateWhitelistDto } from './dto/create-whitelist.dto';
import { UpdateWhitelistDto } from './dto/update-whitelist.dto';
import { Whitelist, WhitelistDocument, WhitelistStatus } from './entities/whitelist.entity';

@Injectable()
export class WhitelistService {
  constructor(
    @InjectModel(Whitelist.name) private whitelistModel: Model<WhitelistDocument>
  ) {}

  async create(createWhitelistDto: CreateWhitelistDto): Promise<Whitelist> {
    const createdWhitelist = new this.whitelistModel(createWhitelistDto);
    return createdWhitelist.save();
  }

  async findAll(): Promise<Whitelist[]> {
    return this.whitelistModel
      .find()
      .populate('user')
      .populate('products')
      .exec();
  }

  async findOne(id: string): Promise<Whitelist> {
    return this.whitelistModel
      .findById(id)
      .populate('user')
      .populate('products')
      .exec();
  }

  async update(id: string, updateWhitelistDto: UpdateWhitelistDto): Promise<Whitelist> {
    return this.whitelistModel
      .findByIdAndUpdate(id, updateWhitelistDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Whitelist> {
    const deletedWhitelist = await this.whitelistModel
      .findByIdAndDelete(id)
      .exec();
    return deletedWhitelist;
  }

  async findByUser(userId: string): Promise<Whitelist[]> {
    return this.whitelistModel
      .find({ user: new MongooseSchema.Types.ObjectId(userId) })
      .populate('user')
      .populate('products')
      .exec();
  }

  async findByProduct(productId: string): Promise<Whitelist[]> {
    return this.whitelistModel
      .find({ products: productId })
      .populate('user')
      .populate('products')
      .exec();
  }

  async findByStatus(status: WhitelistStatus): Promise<Whitelist[]> {
    return this.whitelistModel
      .find({ status })
      .populate('user')
      .populate('products')
      .exec();
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Whitelist[]> {
    return this.whitelistModel
      .find({
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .populate('user')
      .populate('products')
      .exec();
  }

  async addProduct(id: string, productId: string): Promise<Whitelist> {
    const whitelist = await this.whitelistModel.findById(id).exec();
    if (!whitelist) {
      throw new Error('Whitelist not found');
    }
    whitelist.products.push(new MongooseSchema.Types.ObjectId(productId));
    return whitelist.save();
  }

  async removeProduct(id: string, productId: string): Promise<Whitelist> {
    const whitelist = await this.whitelistModel.findById(id).exec();
    if (!whitelist) {
      throw new Error('Whitelist not found');
    }
    whitelist.products = whitelist.products.filter(
      (p) => p.toString() !== productId,
    );
    return whitelist.save();
  }
}
