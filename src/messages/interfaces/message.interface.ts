import { Document } from 'mongoose';
import { User } from '../../auth/interfaces/user.interface';
import { Room } from '../../rooms/interfaces/room.interface';

export interface Message extends Document {
  readonly room: Room;
  readonly author: User;
  readonly message: string;
}
