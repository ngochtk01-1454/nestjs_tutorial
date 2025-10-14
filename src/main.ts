import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { API_CONSTANTS } from './constants/api.constants';
import { swaggerConfig, swaggerSetupOptions } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(API_CONSTANTS.PREFIX);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Enable URI versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: API_CONSTANTS.VERSION,
  });

  // Configure Swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document, swaggerSetupOptions);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
