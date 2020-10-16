import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

@WebSocketGateway()
export class AuthGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;
  users: number = 0;

  async handleConnection() {
    // // A client has connected
    // this.users++;
    // // Notify connected clients of current users
    // this.server.emit('userLogin', this.users);
  }

  async handleDisconnect() {
    // // A client has disconnected
    // this.users--;
    // // Notify connected clients of current users
    // this.server.emit('users', this.users);
  }

  async userLoggedIn(user) {
    this.server.emit('userLoggedIn', user);
  }

  // @SubscribeMessage('login')
  // async onRooms(client, message) {
  //   client.broadcast.emit('rooms', message);
  // }
}
