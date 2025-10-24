import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateArticleCommentsTable1761207283117 implements MigrationInterface {
    name = 'UpdateArticleCommentsTable1761207283117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article_comments" DROP COLUMN "comment"`);
        await queryRunner.query(`ALTER TABLE "article_comments" ADD "body" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article_comments" DROP COLUMN "body"`);
        await queryRunner.query(`ALTER TABLE "article_comments" ADD "comment" character varying NOT NULL`);
    }
}
