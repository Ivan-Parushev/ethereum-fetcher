export interface Transaction {
  transactionHash: string; // the hex encoded transaction hash of the transaction
  transactionStatus: number; // the status of the transaction either 1 (success) or 0 (failure)
  blockHash: string; // the hex encoding of the hash of the block the transaction was included in
  blockNumber: number; // the number of the block the transaction was included in
  from: string; // the etherum address of the transaction sender
  to: string | null; // the etherum address of the transaction receiver or null when its a contract creation transaction.
  contractAddress: string | null; // the etherum address of the newly created contract if this transaction is contract creation
  logsCount: number; // number of log objects, which this transaction generated.
  input: string; // the hex encoding of the data send along with the transaction.
  value: string; // the value transferred in wei
}

export interface TransactionResponse {
  jsonrpc: string;
  id: number;
  result: {
    hash: string;
    blockNumber?: number; // Only if a transaction has been mined
    blockHash?: string; // Only if a transaction has been mined
    timestamp?: number;
    confirmations: number;
    raw?: string;
    to?: string;
    from?: string;
    input: string;
    nonce: number;
    gasLimit: string;
    gasPrice?: string;
    data: string;
    value: string;
    chainId: number;
    r?: string;
    s?: string;
    v?: number;
    type?: number | null; // Typed-Transaction features
    accessList?: AccessList; // EIP-2930; Type 1 & EIP-1559; Type 2
    maxPriorityFeePerGas?: string; // EIP-1559; Type 2
    maxFeePerGas?: string;
  };
}

export interface TransactionReceiptResponse {
  jsonrpc: string;
  id: number;
  result: {
    to: string;
    from: string;
    contractAddress: string;
    transactionIndex: number;
    root?: string;
    gasUsed: string;
    logsBloom: string;
    blockHash: string;
    transactionHash: string;
    logs: Array<Log>;
    blockNumber: number;
    confirmations: number;
    cumulativeGasUsed: string;
    effectiveGasPrice: string;
    byzantium: boolean;
    type: number;
    status?: string;
  };
}

export interface Log {
  blockNumber: number;
  blockHash: string;
  transactionIndex: number;
  removed: boolean;
  address: string;
  data: string;
  topics: Array<string>;
  transactionHash: string;
  logIndex: number;
}

export type AccessList = Array<{ address: string; storageKeys: Array<string> }>;
