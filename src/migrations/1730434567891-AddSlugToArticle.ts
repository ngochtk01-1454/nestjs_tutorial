import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSlugToArticle1730434567891 implements MigrationInterface {
    name = 'AddSlugToArticle1730434567891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" ADD "slug" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "UQ_article_slug" UNIQUE ("slug")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "UQ_article_slug"`);
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "slug"`);
    }
}
