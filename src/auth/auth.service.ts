import { Injectable, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './interfaces/user.interface';

import { AuthGateway } from './auth.gateway';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private authGateway: AuthGateway,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async me(): Promise<any> {
    return 'test';
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<object> {
    const { username, password } = authCredentialsDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({
      username,
      password: hashedPassword,
    });

    try {
      const payload = { username: username, sub: user.id };
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

  async login(user: any) {
    try {
      const requestedUser = await this.userModel.findOne({
        username: user.username,
      });

      if (requestedUser == null) {
        return {
          message: 'User not found',
        };
      }

      const payload = {
        username: requestedUser.username,
        sub: requestedUser.id,
      };

      this.authGateway.userLoggedIn({
        id: requestedUser.id,
        user: requestedUser.username,
      });

      return {
        id: user.userId,
        username: user.username,
        access_token: this.jwtService.sign(payload),
      };
    } catch (err) {
      return { message: 'Error: User not found' };
    }
  }
}
