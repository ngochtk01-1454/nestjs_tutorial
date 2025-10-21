import { ArticleComments } from "src/article_comments/entities/article_comments.entity";
import { BaseEntity } from "src/common/entities/base.entity";
import { Tag } from "src/tags/entities/tag.entity";
import { UserArticleFavorites } from "src/user_article_favorites/entities/user_article_favorites.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Article extends BaseEntity {
  @Column({ length: 255, unique: true })
  slug: string;

  @Column({ length: 255 })
  title: string;
  
  @Column({ length: 255 })
  description: string;

  @Column({ type: 'text' })
  body: string;

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn({ name: 'author_id' })
  author: User;
  
  @OneToMany(() => ArticleComments, (uc) => uc.user)
  comments: ArticleComments[];

  @OneToMany(() => UserArticleFavorites, (uc) => uc.user)
  userArticleFavorites: UserArticleFavorites[];

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable({
    name: 'article_tags',
    joinColumn: { name: 'article_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' }
  })
  tags: Tag[];
}
