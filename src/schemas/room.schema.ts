import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { User } from '../auth/interfaces/user.interface';

export type RoomDocument = Room & Document;

@Schema({ timestamps: true })
export class Room {
  @Prop()
  name: string;

  @Prop()
  creator: User;

  @Prop()
  type: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
