import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter, MyLoggerService } from './exceptionFilter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'], // Niveles de log habilitados
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(MyLoggerService));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
