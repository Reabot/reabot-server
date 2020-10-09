import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from '../schemas/room.schema';
import { UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'Room', schema: RoomSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
