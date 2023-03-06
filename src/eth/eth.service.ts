import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ReqContext } from 'src/utils';

import { EthNodeService } from './node_api/eth.node.service';
import { Transaction } from './node_api/eth.node.api';
import { Transaction as TransactionEntity } from './Transaction.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class EthService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionsRepository: Repository<TransactionEntity>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly ethNodeAPIService: EthNodeService,
  ) {}

  async getTransactions(ctx: ReqContext, transactionHashes: string[]): Promise<Transaction[]> {
    const transactionRecords = await this.transactionsRepository.findBy({ transactionHash: In(transactionHashes) });

    const notFoundInDatabase = transactionHashes.filter((thash) => {
      for (let i = 0; i < transactionRecords.length; i++) {
        if (transactionRecords[i].transactionHash === thash) {
          return false;
        }
      }
      return true;
    });

    let fetchedTransactions = [];
    if (notFoundInDatabase.length) {
      fetchedTransactions = await this.fetchAndPersistTransactions(ctx, notFoundInDatabase);
    }

    return [...transactionRecords, ...fetchedTransactions];
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return await this.transactionsRepository.find();
  }

  private async saveTransactions(ctx: ReqContext, transactions: Transaction[]): Promise<void> {
    const transactionRecords = await this.transactionsRepository.save(transactions);

    if (ctx?.user?.id) {
      const user = await this.usersRepository.findOneBy({ id: ctx.user.id });
      user.transactions = transactionRecords;
      await this.usersRepository.save(user);
    }
  }

  private async fetchAndPersistTransactions(ctx: ReqContext, transactionHashes: string[]): Promise<Transaction[]> {
    const transactions = await this.ethNodeAPIService.getMultipleTransations(transactionHashes);

    this.saveTransactions(ctx, transactions);

    return transactions;
  }
}
