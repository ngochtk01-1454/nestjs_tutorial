import { plainToInstance } from 'class-transformer';
import { CommentDto } from '../dto/comment.dto';
import { ArticleComments } from '../entities/article_comments.entity';

export class CommentMapper {
  static toDto(comment: ArticleComments): CommentDto {
    return plainToInstance(CommentDto, comment, {
      excludeExtraneousValues: true, // Only include decorated properties
      enableImplicitConversion: true,
    });
  }
}
