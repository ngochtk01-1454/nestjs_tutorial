import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type, Expose } from 'class-transformer';
import { AuthorDto } from './author.dto';

export class ArticleDto {
  @ApiProperty({
    description: 'Article ID',
    example: 1,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Article slug (URL-friendly identifier)',
    example: 'how-to-train-your-dragon',
  })
  @Expose()
  slug: string;

  @ApiProperty({
    description: 'Article title',
    example: 'How to train your dragon',
  })
  @Expose()
  title: string;

  @ApiProperty({
    description: 'Article description',
    example: 'Ever wonder how?',
  })
  @Expose()
  description: string;

  @ApiProperty({
    description: 'Article body content',
    example: 'It takes a Jacobian',
  })
  @Expose()
  body: string;

  @ApiProperty({
    description: 'List of article tags',
    example: ['dragons', 'training'],
    type: [String],
  })
  @Expose()
  @Transform(({ obj }) => obj.tags ? obj.tags.map((tag: any) => tag.name) : [])
  tagList: string[];

  @ApiProperty({
    description: 'Article creation date',
    example: '2016-02-18T03:22:56.637Z',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'Article last update date',
    example: '2016-02-18T03:48:35.824Z',
  })
  @Expose()
  updatedAt: Date;

  @ApiProperty({
    description: 'Whether current user has favorited this article',
    example: false,
  })
  @Expose()
  @Transform(({ obj, options }) => {
    // Check if current user favorited this article
    const currentUserId = (options as any)?.currentUserId;
    if (!currentUserId || !obj.userArticleFavorites) return false;
    return obj.userArticleFavorites.some((fav: any) => fav.user.id === currentUserId);
  })
  favorited: boolean;

  @ApiProperty({
    description: 'Number of users who favorited this article',
    example: 0,
  })
  @Expose()
  @Transform(({ obj }) => obj.userArticleFavorites ? obj.userArticleFavorites.length : 0)
  favoritesCount: number;

  @ApiProperty({
    description: 'Article author information',
    type: AuthorDto,
  })
  @Expose()
  @Type(() => AuthorDto)
  @Transform(({ obj }) => {
    if (!obj.author) return null;
    return {
      username: obj.author.name,
      bio: obj.author.bio || '',
      image: obj.author.avatar ? obj.author.avatar.toString('base64') : null,
      following: false // TODO: Implement following logic
    };
  })
  author: AuthorDto;
}
