import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // * .env에서 포트 번호 가져오기
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT') || 0;

  await app.listen(port);
}
bootstrap();
