import { Injectable } from '@nestjs/common';
import { EthNodeService } from './node_api/eth.node.service';

@Injectable()
export class EthService {
  constructor(private readonly ethNodeAPIService: EthNodeService) {}

  async getTransactions(transactionHashes: string[]) {
    return this.ethNodeAPIService.getMultipleTransations(transactionHashes);
  }
}
