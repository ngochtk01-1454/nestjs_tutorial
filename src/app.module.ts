import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { ArticleCommentsModule } from './article_comments/article_comments.module';
import { UserArticleFavoritesModule } from './user_article_favorites/user_article_favorites.module';
import { AuthModule } from './auth/auth.module';
import { i18nConfig } from './config/i18n.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    i18nConfig,
    DatabaseModule,
    UsersModule,
    ArticlesModule,
    ArticleCommentsModule,
    UserArticleFavoritesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
