import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export default class UsersService {
  private readonly users: User[];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
