import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleCommentsService } from './v1/article_comments.service';
import { ArticleCommentsController } from './v1/article_comments.controller';
import { ArticleComments } from './entities/article_comments.entity';
import { Article } from '../articles/entities/article.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleComments, Article, User])],
  controllers: [ArticleCommentsController],
  providers: [ArticleCommentsService],
})
export class ArticleCommentsModule {}
