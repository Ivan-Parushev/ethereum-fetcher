import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EthController } from './eth.controller';
import { EthService } from './eth.service';
import { EthNodeService } from './node_api/eth.node.service';

@Module({
  imports: [HttpModule],
  controllers: [EthController],
  providers: [EthService, EthNodeService],
})
export class EthModule {}
