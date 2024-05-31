import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    //rawBody: true,
    bodyParser: false,
  });
  // app.useBodyParser('raw');
  // app.useBodyParser('text');
  // app.useBodyParser('json', { limit: '50m' });
  // app.useBodyParser('urlencoded', { limit: '50mb', extented: true });
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.listen(4100);
}
bootstrap();
