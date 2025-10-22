import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesService } from './v1/articles.service';
import { ArticlesController } from './v1/articles.controller';
import { Article } from './entities/article.entity';
import { Tag } from '../tags/entities/tag.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Tag, User])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
