import { ArticleComments } from "src/article_comments/entities/article_comments.entity";
import { Article } from "src/articles/entities/article.entity";
import { BaseEntity } from "src/common/entities/base.entity";
import { UserArticleFavorites } from "src/user_article_favorites/entities/user_article_favorites.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @Column({ length: 255 })
  name: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ type: 'bytea', nullable: true })
  avatar?: Buffer;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];

  @OneToMany(() => UserArticleFavorites, (ua) => ua.user)
  userArticleFavorites: UserArticleFavorites[];

  @OneToMany(() => ArticleComments, (uc) => uc.user)
  userArticleComments: ArticleComments[];
}
