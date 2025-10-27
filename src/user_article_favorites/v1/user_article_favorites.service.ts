import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserArticleFavorites } from '../entities/user_article_favorites.entity';
import { ArticleResponseDto } from '../../articles/dto/article-response.dto';
import { ArticleMapper } from '../../articles/mapper/article.mapper';
import { ArticlesService } from 'src/articles/v1/articles.service';

@Injectable()
export class UserArticleFavoritesService {
  constructor(
    @InjectRepository(UserArticleFavorites)
    private favoritesRepository: Repository<UserArticleFavorites>,
    private articleService: ArticlesService
  ) {}

  async favoriteArticle(slug: string, userId: number): Promise<ArticleResponseDto> {
    // Find the article by slug
    const article = await this.articleService.findOneBySlug(slug);

    // Check if already favorited
    const existingFavorite = await this.favoritesRepository.findOne({
      where: {
        user: { id: userId },
        article: { id: article.id },
      },
    });

    if (!existingFavorite) {
      // Create new favorite
      const favorite = this.favoritesRepository.create({
        user: { id: userId },
        article: { id: article.id },
      });
      await this.favoritesRepository.save(favorite);
      article.userArticleFavorites.push(favorite);
    }

    const articleDto = ArticleMapper.toDto(article, userId);
    return { article: articleDto };
  }

  async unfavoriteArticle(slug: string, userId: number): Promise<ArticleResponseDto> {
    // Find the article by slug
    const article = await this.articleService.findOneBySlug(slug);

    // Find and remove the favorite
    const existingFavorite = await this.favoritesRepository.findOne({
      where: {
        user: { id: userId },
        article: { id: article.id },
      },
    });

    if (existingFavorite) {
      article.userArticleFavorites = article.userArticleFavorites.filter(fav => fav.id !== existingFavorite.id);
      await this.favoritesRepository.remove(existingFavorite);
    }

    const articleDto = ArticleMapper.toDto(article, userId);
    return { article: articleDto };
  }
}
