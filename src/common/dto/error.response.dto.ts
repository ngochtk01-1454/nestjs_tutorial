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
    description: 'Error type',
    example: 'Bad Request',
    type: String,
  })
  error: string;
}
