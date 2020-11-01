import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Room } from './interfaces/room.interface';
import { Message } from '../messages/interfaces/message.interface';

import RoomsGateway from './rooms.gateway';

@Injectable()
export default class RoomsService {
  constructor(
    @InjectModel('Room') private RoomModel: Model<Room>,
    @InjectModel('Message') private messageModel: Model<Message>,
    private roomsGateway: RoomsGateway,
  ) {}

  async deleteAllMessagesByRoomId(roomId) {
    let roomFromDb = null;
    roomFromDb = await this.RoomModel.findById(roomId);
    await this.messageModel.deleteMany({ room: roomFromDb });
    return null;
  }

  async getListRooms() {
    const rooms = await this.RoomModel.find();
    return { rooms };
  }

  async getUserListRooms(user): Promise<any> {
    const list = await this.RoomModel.find({ creator: user });
    return { rooms: list };
  }

  async createRoom(body, user): Promise<any> {
    const room = new this.RoomModel({
      name: body.name,
      creator: user,
      type: body.type,
    });

    return room.save();
  }

  async deleteRoom(room): Promise<any> {
    await this.deleteAllMessagesByRoomId(room.roomId);
    const resp = await this.RoomModel.findByIdAndDelete(room.roomId);
    if (resp == null) {
      throw new BadRequestException();
    } else {
      await this.deleteAllMessagesByRoomId(room.roomId);
    }
  }
}
