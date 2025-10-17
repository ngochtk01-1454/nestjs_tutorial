import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponseDto } from '../dto/error.response.dto';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: any[] = [];
    
    this.logger.error(
      `Status: ${status} - Message: ${JSON.stringify(message)} - Exception: ${exception instanceof Error ? exception.stack : exception}`
    );

    if (exception instanceof HttpException) {
      const res: any = exception.getResponse();
      status = exception.getStatus();
      message = res.message || exception.message;
      
      // Check if we have custom errors format from ValidationPipe
      if (res.errors && Array.isArray(res.errors)) {
        errors = res.errors;
      } else if (Array.isArray(res.message)) {
        // handle legacy class-validator error array
        errors = res.message.map((msg) => ({ field: '', message: msg }));
      }
    }

    const errorResponse: ErrorResponseDto = {
      statusCode: status,
      message,
      ...(errors.length ? { errors } : {}),
    };

    response.status(status).json(errorResponse);
  }
}

