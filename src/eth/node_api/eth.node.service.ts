import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { Transaction, TransactionReceiptResponse, TransactionResponse } from './eth.node.api';

@Injectable()
export class EthNodeService {
  private readonly ethNodeUrl: string;

  constructor(private readonly httpService: HttpService, private configService: ConfigService) {
    this.ethNodeUrl = this.configService.get<string>('ETH_NODE_URL');
  }

  async getMultipleTransations(transactionHashes: string[]): Promise<Transaction[]> {
    const parallelRequests = transactionHashes.map((t) => this.getTransactionByHash(t));
    return await Promise.all(parallelRequests);
  }

  async getTransactionByHash(transactionHash: string): Promise<Transaction> {
    const reqURL = this.ethNodeUrl;
    let reqBody = this.getReqBody('eth_getTransactionByHash', transactionHash);
    const reqOpts = this.getReqOpts();

    const { data: transaction } = await firstValueFrom(
      this.httpService.post<TransactionResponse>(reqURL, reqBody, reqOpts),
    );

    let receipt;
    if (transaction.result.blockHash) {
      // transation is not pending
      reqBody = this.getReqBody('eth_getTransactionReceipt', transactionHash);

      const { data } = await firstValueFrom(
        this.httpService.post<TransactionReceiptResponse>(reqURL, reqBody, reqOpts),
      );

      receipt = data;
    }

    return this.createTransationObj(transaction, receipt);
  }

  private createTransationObj(
    transationResponse: TransactionResponse,
    receiptResponse?: TransactionReceiptResponse,
  ): Transaction {
    return {
      transactionHash: transationResponse.result.hash, // the hex encoded transaction hash of the transaction
      transactionStatus: parseInt(receiptResponse?.result.status, 16), // the status of the transaction either 1 (success) or 0 (failure)
      blockHash: transationResponse.result.blockHash, // the hex encoding of the hash of the block the transaction was included in
      blockNumber: transationResponse.result.blockNumber, // the number of the block the transaction was included in
      from: transationResponse.result.from, // the etherum address of the transaction sender
      to: transationResponse.result.to || null, // the etherum address of the transaction receiver or null when its a contract creation transaction.
      contractAddress: receiptResponse?.result.contractAddress || null, // the etherum address of the newly created contract if this transaction is contract creation
      logsCount: receiptResponse?.result.logs?.length || 0, // number of log objects, which this transaction generated.
      input: transationResponse.result.input, // the hex encoding of the data send along with the transaction.
      // value: '' + parseInt(transationResponse.result.value, 16), // the value transferred in wei
      value: transationResponse.result.value,
    };
  }

  private getReqBody(method: string, hash: string) {
    return {
      id: 1,
      jsonrpc: '2.0',
      params: [hash],
      method,
    };
  }

  private getReqOpts() {
    return {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
  }
}
