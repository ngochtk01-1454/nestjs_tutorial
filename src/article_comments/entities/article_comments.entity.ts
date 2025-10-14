import { Article } from "src/articles/entities/article.entity";
import { BaseEntity } from "src/common/entities/base.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ArticleComments extends BaseEntity {
  @ManyToOne(() => User, (user) => user.userArticleComments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Article, (article) => article.comments)
  @JoinColumn({ name: 'article_id' })
  article: Article;

  @Column()
  comment: string;
}
