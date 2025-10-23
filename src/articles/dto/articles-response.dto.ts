import { ApiProperty } from '@nestjs/swagger';
import { ArticleDto } from './article.dto';

export class ArticlesResponseDto {
  @ApiProperty({
    description: 'Array of articles',
    type: [ArticleDto],
  })
  articles: ArticleDto[];

  @ApiProperty({
    description: 'Total count of articles matching the filters',
    example: 100,
  })
  articlesCount: number;
}
