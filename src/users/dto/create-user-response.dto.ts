import { ApiProperty } from "@nestjs/swagger";

export class CreateUserResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: 1,
  })
  id: number;
}
