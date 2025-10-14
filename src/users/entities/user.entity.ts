import { ArticleComments } from "src/article_comments/entities/article_comments.entity";
import { Article } from "src/articles/entities/article.entity";
import { UserArticleFavorites } from "src/user_article_favorites/entities/user_article_favorites.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ type: 'bytea', nullable: true })
  avatar?: Buffer;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];

  @OneToMany(() => UserArticleFavorites, (ua) => ua.user)
  userArticleFavorites: UserArticleFavorites[];

  @OneToMany(() => ArticleComments, (uc) => uc.user)
  userArticleComments: ArticleComments[];
}
