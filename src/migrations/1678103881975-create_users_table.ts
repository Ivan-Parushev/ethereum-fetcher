import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersTable1678103881975 implements MigrationInterface {
  name = 'createUsersTable1678103881975';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_transactions_transactions" ("usersId" integer NOT NULL, "transactionsTransactionHash" character varying NOT NULL, CONSTRAINT "PK_ab9c67b374ae230467053f6cc83" PRIMARY KEY ("usersId", "transactionsTransactionHash"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_93b4d034045239b2976c7e859e" ON "users_transactions_transactions" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0f5c7e5b3716773acb7ffa1418" ON "users_transactions_transactions" ("transactionsTransactionHash") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users_transactions_transactions" ADD CONSTRAINT "FK_93b4d034045239b2976c7e859ee" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_transactions_transactions" ADD CONSTRAINT "FK_0f5c7e5b3716773acb7ffa14187" FOREIGN KEY ("transactionsTransactionHash") REFERENCES "transactions"("transactionHash") ON DELETE CASCADE ON UPDATE CASCADE`,
    );

    await queryRunner.query(
      `INSERT INTO users (username, password) VALUES ('alice', 'alice'), ('bob', 'bob'), ('carol', 'carol'), ('dave', 'dave')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_transactions_transactions" DROP CONSTRAINT "FK_0f5c7e5b3716773acb7ffa14187"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_transactions_transactions" DROP CONSTRAINT "FK_93b4d034045239b2976c7e859ee"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_0f5c7e5b3716773acb7ffa1418"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_93b4d034045239b2976c7e859e"`);
    await queryRunner.query(`DROP TABLE "users_transactions_transactions"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
