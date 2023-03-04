import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  app.setGlobalPrefix('lime');

  console.log(configService.get('CUSTOM_VAR'));

  await app.listen(configService.get<number>('API_PORT', 3000));
}
bootstrap();
