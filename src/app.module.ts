import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EthModule } from './eth/eth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), EthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
