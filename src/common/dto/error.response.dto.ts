import { ApiProperty } from "@nestjs/swagger";

export class ErrorResponseDto {
  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
    type: Number,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error message',
    example: 'Bad Request',
    type: String,
  })
  message: string;

  @ApiProperty({
    example: [{ field: 'email', message: 'Email is invalid' }],
    description: 'List of field errors if applicable',
    required: false,
  })
  errors?: { field: string; message: string }[];
}
