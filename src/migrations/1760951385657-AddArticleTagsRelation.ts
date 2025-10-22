import { MigrationInterface, QueryRunner } from "typeorm";

export class AddArticleTagsRelation1760951385657 implements MigrationInterface {
    name = 'AddArticleTagsRelation1760951385657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "article_tags" ("article_id" integer NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "PK_dd79accc42e2f122f6f3ff7588a" PRIMARY KEY ("article_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f8c9234a4c4cb37806387f0c9e" ON "article_tags" ("article_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_1325dd0b98ee0f8f673db6ce19" ON "article_tags" ("tag_id") `);
        await queryRunner.query(`ALTER TABLE "article" ADD "description" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "article" ADD "title" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "article" ADD "content" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "article_tags" ADD CONSTRAINT "FK_f8c9234a4c4cb37806387f0c9e9" FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "article_tags" ADD CONSTRAINT "FK_1325dd0b98ee0f8f673db6ce194" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article_tags" DROP CONSTRAINT "FK_1325dd0b98ee0f8f673db6ce194"`);
        await queryRunner.query(`ALTER TABLE "article_tags" DROP CONSTRAINT "FK_f8c9234a4c4cb37806387f0c9e9"`);
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "article" ADD "content" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "article" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "description"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1325dd0b98ee0f8f673db6ce19"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f8c9234a4c4cb37806387f0c9e"`);
        await queryRunner.query(`DROP TABLE "article_tags"`);
        await queryRunner.query(`DROP TABLE "tag"`);
    }

}
