import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ArticleCommentsService } from './article_comments.service';
import { CommentResponseDto } from '../dto/comment-response.dto';
import { CommentsResponseDto } from '../dto/comments-response.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { OptionalJwtAuthGuard } from '../../auth/optional-jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../../users/entities/user.entity';
import {
  ApiCommonErrors,
  ApiSimpleSuccessResponse,
  ApiSuccessResponse,
  ResponseMessage,
} from '../../common/decorators';
import { CreateCommentRequestDto } from '../dto/create-comment-request.dto';

@ApiTags('Comments')
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

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Comments retrieved successfully')
  @ApiOperation({
    summary: 'Get comments for article',
    description: 'Retrieve all comments for an article by slug. Authentication is optional.',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiSuccessResponse(CommentsResponseDto)
  @ApiCommonErrors()
  findAll(
    @Param('slug') slug: string
  ): Promise<CommentsResponseDto> {
    return this.articleCommentsService.findAll(slug);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Comment deleted successfully')
  @ApiOperation({
    summary: 'Delete comment',
    description: 'Delete a comment by ID. Only the author can delete their own comment.',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiSimpleSuccessResponse()
  @ApiCommonErrors()
  remove(
    @Param('slug') slug: string,
    @Param('id') id: number,
    @CurrentUser() user: any,
  ): Promise<void> {
    return this.articleCommentsService.remove(slug, id, user.userId);
  }
}
