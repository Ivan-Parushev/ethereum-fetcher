import { Controller, Get, Param } from '@nestjs/common';
import RLP from 'rlp';
import { AppService } from './app.service';

@Controller('/lime')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/eth/:rlphex')
  getTransactions(@Param('rlphex') rlphex: string) {
    const response = [];
    const decoded = RLP.decode(Uint8Array.from(Buffer.from(rlphex, 'hex')));
    decoded.forEach((hash) => {
      const string = new TextDecoder().decode(hash);
      response.push(string);
    });
    return response;
  }
}
