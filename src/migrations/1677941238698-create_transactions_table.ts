import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTransactionsTable1677941238698 implements MigrationInterface {
  name = 'createTransactionsTable1677941238698';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "transaction" ("transactionHash" character varying NOT NULL, "transactionStatus" integer NOT NULL, "blockHash" character varying, "blockNumber" bigint, "from" character varying NOT NULL, "to" character varying, "contractAddress" character varying, "logsCount" integer NOT NULL DEFAULT '0', "input" character varying NOT NULL, "value" bigint NOT NULL, CONSTRAINT "PK_2a797826b8a990f1179614225b6" PRIMARY KEY ("transactionHash"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "transaction"`);
  }
}
