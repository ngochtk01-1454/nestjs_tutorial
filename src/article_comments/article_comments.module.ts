import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleCommentsService } from './v1/article_comments.service';
import { ArticleCommentsController } from './v1/article_comments.controller';
import { ArticleComments } from './entities/article_comments.entity';
import { Article } from '../articles/entities/article.entity';
import { User } from '../users/entities/user.entity';
import { ArticlesService } from 'src/articles/v1/articles.service';
import { UsersService } from 'src/users/v1/users.service';
import { Tag } from 'src/tags/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleComments, Article, User, Tag])],
  controllers: [ArticleCommentsController],
  providers: [ArticleCommentsService, ArticlesService, UsersService],
})
export class ArticleCommentsModule {}
