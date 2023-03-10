import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { username } });
  }

  async getMyTransactions(username: string): Promise<any> {
    const { transactions } = await this.usersRepository.findOne({
      where: { username },
      relations: {
        transactions: true,
      },
    });

    return { transactions };
  }
}
