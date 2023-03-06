import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EthModule } from './eth/eth.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EthModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          url: configService.get<string>('DB_CONNECTION_URL'),
          entities: [],
          synchronize: configService.get<boolean>('DB_SYNC', false),
          retryAttempts: 3,
          autoLoadEntities: true,
          migrationsRun: true,
          migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
