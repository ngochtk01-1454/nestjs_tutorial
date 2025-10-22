import { ArticleComments } from "src/article_comments/entities/article_comments.entity";
import { BaseEntity } from "src/common/entities/base.entity";
import { LENGTH } from "src/constants/length.constants";
import { Tag } from "src/tags/entities/tag.entity";
import { UserArticleFavorites } from "src/user_article_favorites/entities/user_article_favorites.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Article extends BaseEntity {
  @Column({ length: LENGTH.MAX_DEFAULT, unique: true })
  slug: string;

  @Column({ length: LENGTH.MAX_DEFAULT })
  title: string;

  @Column({ length: LENGTH.MAX_DEFAULT })
  description: string;

  @Column({ type: 'text' })
  body: string;

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn({ name: 'author_id' })
  author: User;
  
  @OneToMany(() => ArticleComments, (comment) => comment.article)
  comments: ArticleComments[];

  @OneToMany(() => UserArticleFavorites, (favorite) => favorite.article)
  userArticleFavorites: UserArticleFavorites[];

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable({
    name: 'article_tags',
    joinColumn: { name: 'article_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' }
  })
  tags: Tag[];
}
