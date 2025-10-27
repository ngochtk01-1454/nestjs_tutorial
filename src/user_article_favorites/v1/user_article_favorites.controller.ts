import {
  Controller,
  Post,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserArticleFavoritesService } from './user_article_favorites.service';
import { ArticleResponseDto } from '../../articles/dto/article-response.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import {
  ApiCommonErrors,
  ApiSuccessResponse,
  ResponseMessage,
} from '../../common/decorators';

@ApiTags('Favorites')
@Controller('articles/:slug/favorite')
export class UserArticleFavoritesController {
  constructor(
    private readonly userArticleFavoritesService: UserArticleFavoritesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Article favorited successfully')
  @ApiOperation({
    summary: 'Favorite article',
    description: 'Mark an article as favorite',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiSuccessResponse(ArticleResponseDto)
  @ApiCommonErrors()
  favoriteArticle(
    @Param('slug') slug: string,
    @CurrentUser() user: any,
  ): Promise<ArticleResponseDto> {
    return this.userArticleFavoritesService.favoriteArticle(slug, user.userId);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Article unfavorited successfully')
  @ApiOperation({
    summary: 'Unfavorite article',
    description: 'Remove an article from favorites',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiSuccessResponse(ArticleResponseDto)
  @ApiCommonErrors()
  unfavoriteArticle(
    @Param('slug') slug: string,
    @CurrentUser() user: any,
  ): Promise<ArticleResponseDto> {
    return this.userArticleFavoritesService.unfavoriteArticle(slug, user.userId);
  }
}
