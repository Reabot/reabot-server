import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Message } from './interfaces/message.interface';

import { Room } from '../rooms/interfaces/room.interface';

import RoomsGateway from '../rooms/rooms.gateway';

@Injectable()
export default class MessagesService {
  constructor(
    @InjectModel('Room') private RoomModel: Model<Room>,
    @InjectModel('Message') private MessageModel: Model<Message>,
    private roomsGateway: RoomsGateway,
  ) {}

  async createMessage(body, user): Promise<any> {
    const roomFromDb = await this.RoomModel.findById(body.roomId);
    if (roomFromDb === null)
      return new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    const messageToSave = new this.MessageModel({
      message: body.message,
      room: roomFromDb,
      author: user,
    });

    messageToSave.save();
    this.roomsGateway.sendMessage(body.roomId, messageToSave);
    return messageToSave;
  }

  async getListOfMessages(roomId): Promise<any> {
    let roomFromDb = null;
    let messages = [];
    roomFromDb = await this.RoomModel.findById(roomId);
    if (roomFromDb === null)
      return new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    messages = await this.MessageModel.find({ room: roomFromDb });
    return { messages };
  }
}
