import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import AuthCredentialsDto from './dto/auth-credentials.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export default class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('User') private UserModel: Model<User>,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.UserModel.findOne({ username });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(pass, user.password);

    if (valid) {
      return user;
    }

    return null;
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<any> {
    const { username, password } = authCredentialsDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.UserModel({
      username,
      password: hashedPassword,
    });

    try {
      const payload = { username, sub: user.id };
      await user.save();

      return {
        id: user.id,
        username: user.username,
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
  }

  async checkPassword(password, passwordToCheck): Promise<any> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, passwordToCheck, (error, isMatch) => {
        if (error) {
          reject(error);
        }
        resolve(isMatch);
      });
    });
  }

  async login(user: any): Promise<any> {
    const requestedUser = await this.UserModel.findOne({
      username: user.username,
    });

    if (requestedUser === null) {
      return new NotFoundException();
    }

    const payload = {
      username: requestedUser.username,
      sub: requestedUser.id,
    };

    const res = await this.checkPassword(user.password, requestedUser.password);
    if (!res) {
      return new NotFoundException('User not found');
    }

    return {
      id: user.userId,
      username: user.username,
      access_token: this.jwtService.sign(payload),
    };
  }
}
