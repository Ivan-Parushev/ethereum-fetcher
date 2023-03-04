import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { EthNodeService } from './node_api/eth.node.service';
import { Transaction } from './node_api/eth.node.api';
import { Transaction as TransactionEntity } from './Transaction.entity';

@Injectable()
export class EthService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionsRepository: Repository<TransactionEntity>,
    private readonly ethNodeAPIService: EthNodeService,
  ) {}

  async getTransactions(transactionHashes: string[]) {
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
      fetchedTransactions = await this.fetchAndPersistTransactions(notFoundInDatabase);
    }

    return [...transactionRecords, ...fetchedTransactions];
  }

  private async fetchAndPersistTransactions(transactionHashes: string[]): Promise<Transaction[]> {
    const transactions = await this.ethNodeAPIService.getMultipleTransations(transactionHashes);
    this.transactionsRepository.insert(transactions);

    return transactions;
  }
}
