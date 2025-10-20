import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../users/dto/user-response.dto';

export class CurrentUserResponseDto {
  @ApiProperty({
    description: 'Current authenticated user information with token',
    type: UserResponseDto,
  })
  user: UserResponseDto;
}
