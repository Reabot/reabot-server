import { Document } from 'mongoose';
import { User } from 'src/users/users.service';

export interface Room extends Document {
  readonly creator: User;
  readonly type: string;
}
