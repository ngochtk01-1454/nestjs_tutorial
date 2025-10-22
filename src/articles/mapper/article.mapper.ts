import { plainToInstance } from 'class-transformer';
import { ArticleDto } from "../dto/article.dto";
import { Article } from "../entities/article.entity";

export class ArticleMapper {
  static toDto(article: Article, currentUserId?: number): ArticleDto {
    return plainToInstance(ArticleDto, article, {
      excludeExtraneousValues: true, // Only include decorated properties
      enableImplicitConversion: true,
      ...({ currentUserId } as any),
    });
  }
}
