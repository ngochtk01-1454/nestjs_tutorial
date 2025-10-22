import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Article } from '../entities/article.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleResponseDto } from '../dto/article-response.dto';
import { CreateArticleRequestDto } from '../dto/create-article-request.dto';
import { GetArticlesQueryDto } from '../dto/get-articles-query.dto';
import { ArticlesResponseDto } from '../dto/articles-response.dto';
import { Tag } from '../../tags/entities/tag.entity';
import { User } from '../../users/entities/user.entity';
import { ArticleMapper } from '../mapper/article.mapper';
import { SlugUtils } from '../../common/utils/slug.utils';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(Article) private articlesRepository: Repository<Article>,
        @InjectRepository(Tag) private tagsRepository: Repository<Tag>,
        @InjectRepository(User) private usersRepository: Repository<User>,
        private i18nService: I18nService
    ) {}

    @Transactional()
    async create(createArticleDto: CreateArticleRequestDto, authorId: number): Promise<ArticleResponseDto> {
        // Find the author
        const author = await this.usersRepository.findOne({ where: { id: authorId } });
        if (!author) {
            throw new Error(this.i18nService.t('error.not_found'));
        }

        const uniqueSlug = SlugUtils.generateUniqueSlug(createArticleDto.title);

        // Handle tags - find existing or create new ones
        const tags: Tag[] = await this.findOrCreateTag(createArticleDto.tagList || []);

        // Create the article
        const article = this.articlesRepository.create({
            slug: uniqueSlug,
            title: createArticleDto.title,
            description: createArticleDto.description,
            body: createArticleDto.body,
            author: author,
            tags: tags
        });

        // Save the article with tags relationship
        const savedArticle = await this.articlesRepository.save(article);

        // Load the article with all relations for mapping
        const articleWithRelations = await this.articlesRepository.findOne({
            where: { id: savedArticle.id },
            relations: ['author', 'tags', 'userArticleFavorites']
        });

        if (!articleWithRelations) {
            throw new Error(this.i18nService.t('error.save_article_error'));
        }

        // Map to DTO using ArticleMapper
        const articleDto = ArticleMapper.toDto(articleWithRelations, authorId);
        
        return { article: articleDto };
    }

    private async findOrCreateTag(tagList: string[]): Promise<Tag[]> {
        const tags: Tag[] = [];
        if (tagList && tagList.length > 0) {
            for (const tagName of tagList) {
                let tag = await this.tagsRepository.findOne({ where: { name: tagName } });
                
                if (!tag) {
                    // Create new tag if it doesn't exist
                    tag = this.tagsRepository.create({ name: tagName });
                    await this.tagsRepository.save(tag);
                }
                
                tags.push(tag);
            }
        }

        return tags;
    }

    async findAll(
        query: GetArticlesQueryDto,
        currentUserId?: number,
    ): Promise<ArticlesResponseDto> {
        const { tag, author, favorited, limit = 20, offset = 0 } = query;

        const qb = this.articlesRepository
            .createQueryBuilder('article')
            .innerJoinAndSelect('article.author', 'author')
            .leftJoinAndSelect('article.tags', 'tags')
            .leftJoinAndSelect('article.userArticleFavorites', 'favorites')
            .leftJoinAndSelect('favorites.user', 'favoritesUser')
            .orderBy('article.createdAt', 'DESC');
  

        this.applyFilters(qb, currentUserId, { tag, author, favorited });

        const [articles, totalCount] = await qb
            .skip(offset)
            .take(limit)
            .getManyAndCount();

        const articleDtos = articles.map(article =>
            ArticleMapper.toDto(article, currentUserId),
        );

        return { articles: articleDtos, articlesCount: totalCount };
    }

    private applyFilters(
        qb: SelectQueryBuilder<Article>,
        currentUserId: number | undefined,
        filters: { tag?: string; author?: string; favorited?: boolean }
    ) {
        const { tag, author, favorited } = filters;
 
        if (tag) {
            qb.andWhere(qb2 => {
            const subQuery = qb2
                .subQuery()
                .select('1')
                .from('article_tags', 'at')
                .innerJoin('tag', 't', 'at.tag_id = t.id')
                .where('at.article_id = article.id')
                .andWhere('t.name = :tag')
                .getQuery();
            return `EXISTS ${subQuery}`;
            }, { tag });
        }

        if (author) {
            qb.andWhere('author.name = :author', { author });
        }

        if (favorited && currentUserId) {
            qb.andWhere('favoritesUser.id = :currentUserId', { currentUserId });
        }
    }

}
