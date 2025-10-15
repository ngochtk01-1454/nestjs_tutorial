import { BadRequestException, HttpStatus, ValidationError } from '@nestjs/common';

export function validationExceptionFactory(errors: ValidationError[]) {
  const formattedErrors = errors.flatMap((error) => {
    // Lấy tất cả message từ các constraint
    const messages = Object.values(error.constraints ?? {});

    return messages.map((msg) => ({
      field: error.property,
      message: msg,
    }));
  });

  return new BadRequestException({
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Validate failed',
    errors: formattedErrors,
  });
}
