import { ArticleDto } from "../dto/article.dto";
import { AuthorDto } from "../dto/author.dto";
import { Article } from "../entities/article.entity";

export class ArticleMapper {
  static toDto(article: Article, currentUserId?: number): ArticleDto {
    const articleDto = new ArticleDto();
    articleDto.id = article.id;
    articleDto.slug = article.slug;
    articleDto.title = article.title;
    articleDto.description = article.description;
    articleDto.body = article.body;
    
    // Map tags to tagList (array of tag names)
    articleDto.tagList = article.tags ? article.tags.map(tag => tag.name) : [];
    
    // Format dates as ISO strings
    articleDto.createdAt = article.createdAt.toISOString();
    articleDto.updatedAt = article.updatedAt.toISOString();
    
    // Calculate favorites info (would need to be implemented in service)
    articleDto.favorited = false; // TODO: Check if current user favorited this article
    articleDto.favoritesCount = article.userArticleFavorites ? article.userArticleFavorites.length : 0;
    
    // Map author
    if (article.author) {
      const authorDto = new AuthorDto();
      authorDto.username = article.author.name; // Use name as username
      authorDto.bio = article.author.bio || '';
      authorDto.image = article.author.avatar ? article.author.avatar.toString('base64') : null;
      authorDto.following = false; // TODO: Check if current user follows this author
      articleDto.author = authorDto;
    }
    
    return articleDto;
  }
}
