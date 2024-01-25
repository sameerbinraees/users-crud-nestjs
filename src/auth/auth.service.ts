import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schema/user.schema.js';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async signup(payload: SignupDto): Promise<any> {
    const { email } = payload;
    let user = await this.userModel.findOne({ email });
    if (user)
      throw new ConflictException('User with this email already exists');
    user = await this.usersService.create(payload);
    return { token: this.jwtService.sign({ id: user._id }) };
  }

  async login(payload: LoginDto): Promise<any> {
    const { email, password } = payload;
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user?.password))) {
      return { token: this.jwtService.sign({ id: user._id }) };
    }
    throw new NotFoundException('Email or password is incorrect');
  }
}
