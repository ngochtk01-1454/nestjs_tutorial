import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'User email address',
    example: 'jake@jake.jake',
  })
  email: string;

  @ApiProperty({
    description: 'Username',
    example: 'jake',
  })
  username: string;

  @ApiProperty({
    description: 'User bio/description',
    example: 'I work at statefarm',
    nullable: true,
  })
  bio: string | null;

  @ApiProperty({
    description: 'User profile image URL',
    example: null,
    nullable: true,
  })
  image: string | null;
}
