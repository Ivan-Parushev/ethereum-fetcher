import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { EthController } from './eth.controller';
import { EthService } from './eth.service';
import { EthNodeService } from './node_api/eth.node.service';
import { Transaction } from './Transaction.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Transaction])],
  controllers: [EthController],
  providers: [EthService, EthNodeService],
})
export class EthModule {}
