import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export default class RoomsGateway {
  @WebSocketServer() wss: Server;

  @SubscribeMessage('joinRoom')
  async joinRoom(socket: Socket, data) {
    socket.join(data.room);
    this.wss.to(data.room).emit('onJoinRoom', data.user);
  }

  async sendMessage(id, data) {
    this.wss.to(id).emit('onNewMessage', data);
  }

  async createRoom(data) {
    this.wss.emit('onNewRoom', data);
  }
}
