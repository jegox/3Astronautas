import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const SwaggerMockup = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('API RestFul 3 Astronautas')
    .setDescription('')
    .setVersion('0.1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document);
};
