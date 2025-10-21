import { Article } from '../../articles/entities/article.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Tag extends BaseEntity {
  @Column({ length: 255, unique: true })
  name: string;

  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];
}
