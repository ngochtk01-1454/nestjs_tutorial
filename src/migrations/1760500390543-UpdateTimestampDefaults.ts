import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTimestampDefaults1760500390543 implements MigrationInterface {
    name = 'UpdateTimestampDefaults1760500390543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_article_favorites" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "article_comments" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "user_article_favorites" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_article_favorites" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "article" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "article" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "article_comments" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "article_comments" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "article_comments" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "article_comments" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "article" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "article" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_article_favorites" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_article_favorites" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "article_comments" ADD "deleted_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "article" ADD "deleted_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_article_favorites" ADD "deleted_at" TIMESTAMP NOT NULL`);
    }

}
