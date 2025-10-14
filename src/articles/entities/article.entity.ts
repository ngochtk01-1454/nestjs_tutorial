import { ArticleComments } from "src/article_comments/entities/article_comments.entity";
import { BaseEntity } from "src/common/entities/base.entity";
import { UserArticleFavorites } from "src/user_article_favorites/entities/user_article_favorites.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Article extends BaseEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn({ name: 'author_id' })
  author: User;
  
  @OneToMany(() => ArticleComments, (uc) => uc.user)
  comments: ArticleComments[];

  @OneToMany(() => UserArticleFavorites, (uc) => uc.user)
  userArticleFavorites: UserArticleFavorites[];
}
