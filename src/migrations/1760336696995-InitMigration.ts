import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1760336696995 implements MigrationInterface {
    name = 'InitMigration1760336696995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_article_favorites" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP NOT NULL, "user_id" integer, "article_id" integer, CONSTRAINT "PK_20894d3be6011f1475b0d4ff740" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "article" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP NOT NULL, "author_id" integer, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "article_comments" ("id" SERIAL NOT NULL, "comment" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP NOT NULL, "user_id" integer, "article_id" integer, CONSTRAINT "PK_76305985dc2ec48641fdbd44c76" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "bio" text, "avatar" bytea, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_article_favorites" ADD CONSTRAINT "FK_53e7f50d9cf52a00dd2d537e491" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_article_favorites" ADD CONSTRAINT "FK_a723bd98d64506c1f016b9f1c67" FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_16d4ce4c84bd9b8562c6f396262" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article_comments" ADD CONSTRAINT "FK_98d60f2741ac4ffe1e0167a4498" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article_comments" ADD CONSTRAINT "FK_4842e344aefdd5cea5d7c87d9df" FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article_comments" DROP CONSTRAINT "FK_4842e344aefdd5cea5d7c87d9df"`);
        await queryRunner.query(`ALTER TABLE "article_comments" DROP CONSTRAINT "FK_98d60f2741ac4ffe1e0167a4498"`);
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_16d4ce4c84bd9b8562c6f396262"`);
        await queryRunner.query(`ALTER TABLE "user_article_favorites" DROP CONSTRAINT "FK_a723bd98d64506c1f016b9f1c67"`);
        await queryRunner.query(`ALTER TABLE "user_article_favorites" DROP CONSTRAINT "FK_53e7f50d9cf52a00dd2d537e491"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "article_comments"`);
        await queryRunner.query(`DROP TABLE "article"`);
        await queryRunner.query(`DROP TABLE "user_article_favorites"`);
    }

}
