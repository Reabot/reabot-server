import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  async createMessage(body): Promise<any> {
    console.log(body);
  }

  async getListOfMessages(roomId): Promise<object> {
    return {
      messages: [],
    };
  }
}
