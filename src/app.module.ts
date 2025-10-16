import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { i18nConfig } from './config/i18n.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    i18nConfig,
    DatabaseModule,
    UsersModule,
    ArticlesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
