import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Context, ReqContext, AllowUnauthorized } from 'src/utils';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EthService } from './eth.service';
import { decodeRlpHex } from './utils';

@Controller()
export class EthController {
  constructor(private readonly ethService: EthService, private configService: ConfigService) {}

  @AllowUnauthorized()
  @Get('/eth/:rlphex')
  async getTransactions(@Param('rlphex') rlphex: string, @Context() ctx: ReqContext) {
    const tHashes = decodeRlpHex(rlphex);
    console.log(ctx.user);
    return {
      transactions: await this.ethService.getTransactions(tHashes),
    };
  }

  @AllowUnauthorized()
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async getAllTransactions() {
    return {
      transactions: await this.ethService.getAllTransactions(),
    };
  }
}
