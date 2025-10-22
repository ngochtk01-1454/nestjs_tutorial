import { ApiProperty } from '@nestjs/swagger';
import { ArticleDto } from './article.dto';

export class ArticleResponseDto {
  @ApiProperty({
    description: 'Article data',
    type: ArticleDto,
  })
  article: ArticleDto;
}
