import {
  Controller,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ArticleCommentsService } from './article_comments.service';
import { CommentResponseDto } from '../dto/comment-response.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../../users/entities/user.entity';
import {
  ApiCommonErrors,
  ApiSuccessResponse,
  ResponseMessage,
} from '../../common/decorators';
import { CreateCommentRequestDto } from '../dto/create-comment-request.dto';

@Controller('articles/:slug/comments')
export class ArticleCommentsController {
  constructor(
    private readonly articleCommentsService: ArticleCommentsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Comment created successfully')
  @ApiOperation({
    summary: 'Create comment for article',
    description: 'Add a comment to an article by slug',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiSuccessResponse(CommentResponseDto)
  @ApiCommonErrors()
  create(
    @Param('slug') slug: string,
    @Body() createCommentDto: CreateCommentRequestDto,
    @CurrentUser() user: any,
  ): Promise<CommentResponseDto> {
    return this.articleCommentsService.create(slug, createCommentDto, user.userId);
  }
}
