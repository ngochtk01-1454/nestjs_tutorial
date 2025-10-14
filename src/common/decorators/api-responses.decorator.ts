import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from '../dto/error.response.dto';

/**
 * Common API Error Responses decorator
 */
export function ApiCommonErrors() {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: 'Bad Request - Invalid input data',
      type: ErrorResponseDto,
      example: {
        statusCode: 400,
        message: ['Email must be a valid email address', 'Password is required'],
        error: 'Bad Request'
      }
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized - Invalid credentials',
      type: ErrorResponseDto,
      example: {
        statusCode: 401,
        message: 'Invalid credentials',
        error: 'Unauthorized'
      }
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
      type: ErrorResponseDto,
      example: {
        statusCode: 500,
        message: 'Internal server error',
        error: 'Internal Server Error'
      }
    })
  );
}
