import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { ArticleCommentsModule } from './article_comments/article_comments.module';
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
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
