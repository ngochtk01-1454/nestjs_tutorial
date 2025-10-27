import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserArticleFavoritesController } from './v1/user_article_favorites.controller';
import { UserArticleFavoritesService } from './v1/user_article_favorites.service';
import { UserArticleFavorites } from './entities/user_article_favorites.entity';
import { Article } from '../articles/entities/article.entity';
import { User } from '../users/entities/user.entity';
import { ArticlesService } from 'src/articles/v1/articles.service';
import { Tag } from 'src/tags/entities/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserArticleFavorites, Article, User, Tag]),
  ],
  controllers: [UserArticleFavoritesController],
  providers: [UserArticleFavoritesService, ArticlesService],
  exports: [UserArticleFavoritesService],
})
export class UserArticleFavoritesModule {}
