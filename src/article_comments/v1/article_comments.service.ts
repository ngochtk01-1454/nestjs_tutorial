import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { ArticleComments } from '../entities/article_comments.entity';
import { Article } from '../../articles/entities/article.entity';
import { User } from '../../users/entities/user.entity';
import { CommentResponseDto } from '../dto/comment-response.dto';
import { CommentsResponseDto } from '../dto/comments-response.dto';
import { CommentMapper } from '../mapper/comment.mapper';
import { CreateCommentRequestDto } from '../dto/create-comment-request.dto';
import { ArticlesService } from 'src/articles/v1/articles.service';
import { UsersService } from 'src/users/v1/users.service';

@Injectable()
export class ArticleCommentsService {
  constructor(
    @InjectRepository(ArticleComments)
    private commentsRepository: Repository<ArticleComments>,
    private i18nService: I18nService,
    private articleService: ArticlesService,
    private userService: UsersService
  ) {}

  async create(
    slug: string,
    createCommentDto: CreateCommentRequestDto,
    userId: number,
  ): Promise<CommentResponseDto> {
    // Find the article by slug
    const article = await this.articleService.findOneBySlug(slug)
    // Find the user
    const user = await this.userService.findById(userId);

    // Create the comment
    const comment = this.commentsRepository.create({
      body: createCommentDto.comment.body,
      article,
      user,
    });

    // Save the comment
    const savedComment = await this.commentsRepository.save(comment);

    // Load the comment with relations
    const commentWithRelations = await this.commentsRepository.findOne({
      where: { id: savedComment.id },
      relations: ['user'],
    });

    if (!commentWithRelations) {
      throw new Error(this.i18nService.t('error.save_comment_error'));
    }

    // Map to DTO
    const commentDto = CommentMapper.toDto(commentWithRelations);

    return { comment: commentDto };
  }

  async findAll(slug: string): Promise<CommentsResponseDto> {
    // Find the article by slug
    const article = await this.articleService.findOneBySlug(slug);

    // Find all comments for this article
    const comments = await this.commentsRepository.find({
      where: { article: { id: article.id } },
      relations: ['user'],
      order: { createdAt: 'DESC' }, // Most recent comments first
    });

    // Map to DTOs
    const commentDtos = comments.map(comment => CommentMapper.toDto(comment));

    return { comments: commentDtos };
  }

  async remove(slug: string, commentId: number, userId: number): Promise<void> {
    // Find the article by slug
    const article = await this.articleService.findOneBySlug(slug);

    // Find the comment
    const comment = await this.commentsRepository.findOne({
      where: { 
        id: commentId, 
        article: { id: article.id } 
      },
      relations: ['user', 'article'],
    });

    if (!comment) {
      throw new NotFoundException(
        this.i18nService.t('error.not_found'),
      );
    }

    // Check if the current user is the author of the comment
    if (comment.user.id !== userId) {
      throw new ForbiddenException(
        this.i18nService.t('error.forbidden'),
      );
    }

    // Delete the comment
    await this.commentsRepository.remove(comment);
  }
}
