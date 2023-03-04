import { Controller, Get, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EthService } from './eth.service';
import { decodeRlpHex } from './utils';

@Controller()
export class EthController {
  constructor(private readonly ethService: EthService, private configService: ConfigService) {}

  @Get('/eth/:rlphex')
  async getTransactions(@Param('rlphex') rlphex: string) {
    const tHashes = decodeRlpHex(rlphex);
    return {
      transactions: await this.ethService.getTransactions(tHashes),
    };
  }

  @Get('/all')
  async getAllTransactions() {
    return {
      transactions: await this.ethService.getAllTransactions(),
    };
  }
}
