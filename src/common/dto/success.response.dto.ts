import { ApiProperty } from "@nestjs/swagger";

export class SuccessResponseDto <T = any> {
   @ApiProperty({
    description: 'HTTP status code',
    example: 200,
    type: Number,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Success message',
    example: 'Successfully',
    type: String,
  })
  message: string;

  @ApiProperty({
    description: 'Data returned in the response',
  })
  data?: T;
}
