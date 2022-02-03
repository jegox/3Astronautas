import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ErrorsInterceptor } from './commons/interceptors/errors.interceptor';
import { ResponseInterceptor } from './commons/interceptors/response.interceptor';
import { SwaggerMockup } from './commons/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ErrorsInterceptor(), new ResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors();
  app.setGlobalPrefix('/api');

  SwaggerMockup(app);

  await app.listen(3000);
}
bootstrap();
