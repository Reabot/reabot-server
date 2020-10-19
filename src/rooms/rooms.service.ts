import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Room } from './interfaces/room.interface';
import { Message } from '../messages/interfaces/message.interface';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel('Room') private roomModel: Model<Room>,
    @InjectModel('Message') private messageModel: Model<Message>,
  ) {}

  async deleteAllMessagesByRoomId(roomId) {
    let roomFromDb = null;
    try {
      roomFromDb = await this.roomModel.findById(roomId);
    } catch (err) {
      return err;
    }

    try {
      await this.messageModel.deleteMany({ room: roomFromDb });
    } catch (err) {
      return err;
    }
  }

  async getListRooms() {
    try {
      const list = await this.roomModel.find();
      return { rooms: list };
    } catch (e) {
      throw e;
    }
  }

  async getUserListRooms(user): Promise<any> {
    try {
      const list = await this.roomModel.find({ creator: user });
      return { rooms: list };
    } catch (e) {
      throw e;
    }
  }

  async createRoom(body, user): Promise<any> {
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
  }

  async deleteRoom(room): Promise<any> {
    try {
      await this.deleteAllMessagesByRoomId(room.roomId);
      const resp = await this.roomModel.findByIdAndDelete(room.roomId);
      if (resp == null) {
        throw new BadRequestException();
      } else {
        await this.deleteAllMessagesByRoomId(room.roomId);
      }
    } catch (err) {
      throw err;
    }
  }
}
