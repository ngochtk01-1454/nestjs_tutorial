import { ApiProperty } from '@nestjs/swagger';
import { AuthorDto } from './author.dto';

export class ArticleDto {
  @ApiProperty({
    description: 'Article ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Article slug (URL-friendly identifier)',
    example: 'how-to-train-your-dragon',
  })
  slug: string;

  @ApiProperty({
    description: 'Article title',
    example: 'How to train your dragon',
  })
  title: string;

  @ApiProperty({
    description: 'Article description',
    example: 'Ever wonder how?',
  })
  description: string;

  @ApiProperty({
    description: 'Article body content',
    example: 'It takes a Jacobian',
  })
  body: string;

  @ApiProperty({
    description: 'List of article tags',
    example: ['dragons', 'training'],
    type: [String],
  })
  tagList: string[];

  @ApiProperty({
    description: 'Article creation date',
    example: '2016-02-18T03:22:56.637Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Article last update date',
    example: '2016-02-18T03:48:35.824Z',
  })
  updatedAt: string;

  @ApiProperty({
    description: 'Whether current user has favorited this article',
    example: false,
  })
  favorited: boolean;

  @ApiProperty({
    description: 'Number of users who favorited this article',
    example: 0,
  })
  favoritesCount: number;

  @ApiProperty({
    description: 'Article author information',
    type: AuthorDto,
  })
  author: AuthorDto;
}
