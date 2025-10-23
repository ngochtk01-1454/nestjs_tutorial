import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { ArticleComments } from '../entities/article_comments.entity';
import { Article } from '../../articles/entities/article.entity';
import { User } from '../../users/entities/user.entity';
import { CommentResponseDto } from '../dto/comment-response.dto';
import { CommentMapper } from '../mapper/comment.mapper';
import { CreateCommentRequestDto } from '../dto/create-comment-request.dto';

@Injectable()
export class ArticleCommentsService {
  constructor(
    @InjectRepository(ArticleComments)
    private commentsRepository: Repository<ArticleComments>,
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private i18nService: I18nService,
  ) {}

  async create(
    slug: string,
    createCommentDto: CreateCommentRequestDto,
    userId: number,
  ): Promise<CommentResponseDto> {
    // Find the article by slug
    const article = await this.articlesRepository.findOne({
      where: { slug },
    });

    if (!article) {
      throw new NotFoundException(
        this.i18nService.t('error.not_found'),
      );
    }

    // Find the user
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(this.i18nService.t('error.not_found'));
    }

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
}
