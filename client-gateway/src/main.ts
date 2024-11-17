import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common/rpc-exception.filter';

async function bootstrap() {
  const logger = new Logger('Main-Cliente-Gateway');

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.useGlobalFilters(new RpcCustomExceptionFilter());
  app.enableCors();
  await app.listen(3000);

  logger.log('Gateway running on port 3000');
}
bootstrap();
