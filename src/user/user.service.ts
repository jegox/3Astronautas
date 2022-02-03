import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SignUpDTO } from 'src/auth/dto/sign-up.dto';

import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(payload: SignUpDTO): Promise<Partial<User>> {
    try {
      const { fullname, email } = await this.userModel.create(payload);
      return { fullname, email };
    } catch (error) {
      throw new HttpException({ message: error.message }, 500);
    }
  }

  async findOne(_id: any): Promise<User | undefined> {
    return await this.userModel.findOne({ _id }, { password: 0 });
  }

  async userById(id: string): Promise<User | undefined> {
    return await this.userModel.findOne(
      { _id: new Types.ObjectId(id) },
      { password: 0 },
    );
  }

  async userByEmail(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({ email });
  }
}
