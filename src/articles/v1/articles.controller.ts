import { Controller, Get, Post, Body, HttpCode, HttpStatus, UseGuards, Query, Param, Put, Delete } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ApiCommonErrors, ApiSimpleSuccessResponse, ApiSuccessResponse, ResponseMessage } from 'src/common/decorators';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ArticleResponseDto } from '../dto/article-response.dto';
import { ArticlesResponseDto } from '../dto/articles-response.dto';
import { CreateArticleRequestDto } from '../dto/create-article-request.dto';
import { GetArticlesQueryDto } from '../dto/get-articles-query.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { OptionalJwtAuthGuard } from '../../auth/optional-jwt-auth.guard';
import { UpdateArticleRequestDto } from '../dto/update-article-request.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}
  
  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Article created successfully')
  @ApiOperation({
    summary: 'Create article',
    description: 'Create a new article',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiSuccessResponse(ArticleResponseDto)
  @ApiCommonErrors()
  create(
    @Body() createArticleDto: CreateArticleRequestDto,
    @CurrentUser() user: any
  ): Promise<ArticleResponseDto> {
    return this.articlesService.create(createArticleDto, user.userId);
  }

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Articles retrieved successfully')
  @ApiOperation({
    summary: 'Get articles',
    description: 'Returns most recent articles globally by default, provide tag, author or favorited query parameter to filter results. Authentication is optional.',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiSuccessResponse(ArticlesResponseDto)
  @ApiCommonErrors()
  findAll(
    @Query() query: GetArticlesQueryDto,
    @CurrentUser() user?: any
  ): Promise<ArticlesResponseDto> {
    return this.articlesService.findAll(query, user?.userId);
  }

  @Get(':slug')
  @UseGuards(OptionalJwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get article successfully')
  @ApiOperation({
    summary: 'Get article by slug',
    description: 'Returns a single article by its slug. No authentication required.',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiSuccessResponse(ArticleResponseDto)
  @ApiCommonErrors()
  get(
    @Param('slug') slug: string,
    @CurrentUser() user?: any
  ): Promise<ArticleResponseDto> {
    return this.articlesService.findBySlug(slug, user?.userId);
  }

  @Put(':slug')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Article updated successfully')
  @ApiOperation({
    summary: 'Update article by slug',
    description: 'Updates a single article by its slug. Authentication required.',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiSuccessResponse(ArticleResponseDto)
  @ApiCommonErrors()
  update(
    @Param('slug') slug: string,
    @Body() updateArticleDto: UpdateArticleRequestDto,
    @CurrentUser() user: any
  ): Promise<ArticleResponseDto> {
    return this.articlesService.update(slug, updateArticleDto, user.userId);
  }

  @Delete(':slug')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Delete article successfully')
  @ApiOperation({
    summary: 'Delete article by slug',
    description: 'Deletes a single article by its slug. Authentication required.',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiSimpleSuccessResponse()
  @ApiCommonErrors()
  delete(
    @Param('slug') slug: string,
    @CurrentUser() user: any
  ): Promise<void> {
    return this.articlesService.delete(slug, user.userId);
  }
}
