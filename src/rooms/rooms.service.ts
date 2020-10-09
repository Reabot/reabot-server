import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Room } from './interfaces/room.interface';
import { User } from '../auth/interfaces/user.interface';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Room') private roomModel: Model<Room>,
  ) {}

  async getListRooms() {
    try {
      let list = await this.roomModel.find();
      return { rooms: list };
    } catch (e) {
      throw e;
    }
  }

  async getUserListRooms(user): Promise<object> {
    try {
      let list = await this.roomModel.find({ creator: user });
      return { rooms: list };
    } catch (e) {
      throw e;
    }
  }

  async createRoom(body, user): Promise<object> {
    const room = new this.roomModel({
      name: body.name,
      creator: user,
      type: body.type,
    });

    try {
      room.save();
      return room;
    } catch (err) {
      throw err;
    }

    return {};
  }
}
