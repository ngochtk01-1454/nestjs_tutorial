import { Module } from '@nestjs/common';
import { ArticlesService } from './v1/articles.service';
import { ArticlesController } from './v1/articles.controller';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
