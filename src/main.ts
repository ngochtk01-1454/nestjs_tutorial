import { NestFactory } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType, BadRequestException } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { API_CONSTANTS } from './constants/api.constants';
import { swaggerConfig, swaggerSetupOptions } from './config/swagger.config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { validationExceptionFactory } from './common/exceptions/validation-exception.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(API_CONSTANTS.PREFIX);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: validationExceptionFactory,
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

  // Get Reflector from DI container for TransformInterceptor
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
