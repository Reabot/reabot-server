import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(pass, user.password);

    if (valid) {
      return user;
    }

    return null;
  }

  async me(): Promise<any> {
    return 'test';
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<any> {
    const { username, password } = authCredentialsDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({
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

  async login(user: any): Promise<any> {
    try {
      const requestedUser = await this.userModel.findOne({
        username: user.username,
      });

      const payload = {
        username: requestedUser.username,
        sub: requestedUser.id,
      };

      return {
        id: user.userId,
        username: user.username,
        access_token: this.jwtService.sign(payload),
      };
    } catch (err) {
      console.log(err);
      throw new ConflictException();
    }
  }
}
