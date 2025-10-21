import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';

export class UserResponseDto {
  @ApiProperty({
    description: 'User information',
    type: UserDto,
  })
  user: UserDto;
}
