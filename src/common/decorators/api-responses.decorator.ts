import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ErrorResponseDto } from '../dto/error.response.dto';
import { SuccessResponseDto } from '../dto/success.response.dto';

/**
 * Common API Error Responses decorator
 */
export function ApiCommonErrors() {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      type: ErrorResponseDto,
      example: {
        statusCode: 400,
        message: 'Invalid input data',
        errors: [{ field: 'email', message: 'Email is invalid' }],
      }
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
      type: ErrorResponseDto,
      example: {
        statusCode: 401,
        message: 'Invalid credentials',
      }
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
      type: ErrorResponseDto,
      example: {
        statusCode: 500,
        message: 'Internal server error',
      }
    })
  );
}

/**
 * Common API Success Responses decorator
 */
export const ApiSuccessResponse = <TModel extends new (...args: any[]) => any>(
  model: TModel,
  description = 'Successful response',
) => {
  return applyDecorators(
    ApiExtraModels(SuccessResponseDto, model),
    ApiResponse({
      status: 200,
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(SuccessResponseDto) },
          {
            properties: {
              data: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
};
