import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { User } from '../auth/interfaces/user.interface';
import { Room } from '../rooms/interfaces/room.interface';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop()
  message: string;

  @Prop()
  room: Room;

  @Prop()
  author: User;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
