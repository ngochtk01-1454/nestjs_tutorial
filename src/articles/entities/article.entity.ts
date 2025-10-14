import { ArticleComments } from "src/article_comments/entities/article_comments.entity";
import { UserArticleFavorites } from "src/user_article_favorites/entities/user_article_favorites.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn({ name: 'author_id' })
  author: User;
  
  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(() => ArticleComments, (uc) => uc.user)
  comments: ArticleComments[];

  @OneToMany(() => UserArticleFavorites, (uc) => uc.user)
  userArticleFavorites: UserArticleFavorites[];
}
