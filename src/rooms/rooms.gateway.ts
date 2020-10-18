import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class RoomsGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;

  constructor() {}

  afterInit() {}

  @SubscribeMessage('joinRoom')
  async joinRoom(socket: Socket, data) {
    socket.join(data.room);
    this.wss.to(data.room).emit('onJoinRoom', data.user);
  }

  async sendMessage(data) {
    this.wss.to(data.room.id).emit('onNewMessage', data);
  }
}
