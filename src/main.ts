import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './commons/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // * exception filter 전역 사용 등록
  app.useGlobalFilters(new HttpExceptionFilter());

  // * .env에서 포트 번호 가져오기
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT') || 0;

  await app.listen(port);
}
bootstrap();
