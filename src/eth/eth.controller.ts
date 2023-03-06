import { Controller, Get, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Context, ReqContext, AllowUnauthorized } from 'src/utils';
import { EthService } from './eth.service';
import { decodeRlpHex } from './utils';

@Controller()
export class EthController {
  constructor(private readonly ethService: EthService, private configService: ConfigService) {}

  @AllowUnauthorized()
  @Get('/eth/:rlphex')
  async getTransactions(@Param('rlphex') rlphex: string, @Context() ctx: ReqContext) {
    const tHashes = decodeRlpHex(rlphex);

    return {
      transactions: await this.ethService.getTransactions(ctx, tHashes),
    };
  }

  @AllowUnauthorized()
  @Get('/all')
  async getAllTransactions() {
    return {
      transactions: await this.ethService.getAllTransactions(),
    };
  }
}
