import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryColumn()
  transactionHash: string;

  @Column({ nullable: false })
  transactionStatus: number;

  @Column({ nullable: true })
  blockHash: string;

  @Column({ nullable: true, type: 'bigint' })
  blockNumber: string;

  @Column({ nullable: false })
  from: string;

  @Column({ nullable: true })
  to: string;

  @Column({ nullable: true })
  contractAddress: string;

  @Column({ nullable: false, default: 0 })
  logsCount: number;

  @Column({ nullable: false })
  input: string;

  @Column({ nullable: false, type: 'bigint' })
  value: string;
}
