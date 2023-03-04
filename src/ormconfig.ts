import { DataSourceOptions, DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

function getConfig(): DataSourceOptions {
  return {
    type: 'postgres',
    url: process.env.DB_CONNECTION_URL,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,

    migrationsRun: true,
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  };
}

ConfigModule.forRoot({
  isGlobal: true,
});

export default new DataSource(getConfig());
