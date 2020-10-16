import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';

@WebSocketGateway()
export class RoomsGateway {
  @WebSocketServer() server;

  @SubscribeMessage('rooms')
  async onRooms(client, room) {
    client.broadcast.emit('rooms', room);
  }
}
