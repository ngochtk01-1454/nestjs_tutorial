import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ApiCommonErrors, ApiSuccessResponse, ResponseMessage } from 'src/common/decorators';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ArticleResponseDto } from '../dto/article-response.dto';
import { CreateArticleRequestDto } from '../dto/create-article-request.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { User } from '../../users/entities/user.entity';

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
    @CurrentUser() user: User
  ): Promise<ArticleResponseDto> {
    return this.articlesService.create(createArticleDto, user.id);
  }
}
