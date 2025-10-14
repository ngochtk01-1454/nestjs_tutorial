import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Article } from '../articles/entities/article.entity';
import { ArticleComments } from '../article_comments/entities/article_comments.entity';
import { UserArticleFavorites } from '../user_article_favorites/entities/user_article_favorites.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, Article, ArticleComments, UserArticleFavorites],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});

