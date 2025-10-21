import { ApiProperty } from '@nestjs/swagger';

export class AuthorDto {
  @ApiProperty({
    description: 'Author username',
    example: 'jake',
  })
  username: string;

  @ApiProperty({
    description: 'Author bio',
    example: 'I work at statefarm',
  })
  bio: string;

  @ApiProperty({
    description: 'Author profile image URL',
    example: 'https://i.stack.imgur.com/xHWG8.jpg',
    nullable: true,
  })
  image: string | null;

  @ApiProperty({
    description: 'Whether current user is following this author',
    example: false,
  })
  following: boolean;
}
