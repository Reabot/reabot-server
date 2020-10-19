import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Message } from './interfaces/message.interface';

import { User } from '../auth/interfaces/user.interface';
import { Room } from '../rooms/interfaces/room.interface';

import { RoomsGateway } from '../rooms/rooms.gateway';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Room') private roomModel: Model<Room>,
    @InjectModel('Message') private messageModel: Model<Message>,
    private roomsGateway: RoomsGateway,
  ) {}

  async createMessage(body, user): Promise<any> {
    let roomFromDb = null;

    try {
      roomFromDb = await this.roomModel.findById(body.roomId);
    } catch (err) {
      throw err;
    }

    const messageToSave = new this.messageModel({
      message: body.message,
      room: roomFromDb,
      author: user,
    });

    try {
      messageToSave.save();
      this.roomsGateway.sendMessage(messageToSave);
      return messageToSave;
    } catch (err) {
      throw err;
    }
  }

  async getListOfMessages(roomId): Promise<any> {
    let room = null;
    let messages = [];
    try {
      room = await this.roomModel.findById(roomId);
    } catch (err) {
      return err;
    }

    try {
      messages = await this.messageModel.find({ room });
      return { messages };
    } catch (err) {
      return err;
    }
  }
}
