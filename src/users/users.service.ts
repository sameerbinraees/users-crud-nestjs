import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema.js';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
    return new this.userModel(createUserDto).save();
  }

  async findAll() {
    return `This action returns all users`;
    return this.userModel.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
    return this.userModel.findById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
    return this.userModel.findByIdAndDelete(id);
  }
}
