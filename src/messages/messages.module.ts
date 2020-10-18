import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { RoomSchema } from '../schemas/room.schema';
import { MessageSchema } from '../schemas/message.schema';
import { RoomsGateway } from '../rooms/rooms.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Room', schema: RoomSchema },
      { name: 'Message', schema: MessageSchema },
    ]),
  ],
  controllers: [MessagesController],
  providers: [MessagesService, RoomsGateway],
})
export class MessagesModule {}
