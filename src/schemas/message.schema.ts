import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { User } from '../auth/interfaces/user.interface';
// import {Rooms} from '../rooms/interfaces/room.interface'

export type MessageDocument = Messages & Document;

@Schema({ timestamps: true })
export class Messages {
  @Prop()
  message: string;

  // @Prop()
  // room: Rooms;

  @Prop()
  creator: User;
}

export const MessagesSchema = SchemaFactory.createForClass(Messages);
