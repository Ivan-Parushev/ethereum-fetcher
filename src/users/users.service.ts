import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'alice',
      password: 'alice',
    },
    {
      userId: 2,
      username: 'bob',
      password: 'bob',
    },
    {
      userId: 3,
      username: 'carol',
      password: 'carol',
    },
    {
      userId: 4,
      username: 'dave',
      password: 'dave',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
