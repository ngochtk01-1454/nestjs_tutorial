import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserEntity1760686999871 implements MigrationInterface {
    name = 'UpdateUserEntity1760686999871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Update any NULL names to a default value before adding NOT NULL constraint
        await queryRunner.query(`UPDATE "user" SET "name" = 'Unknown User' WHERE "name" IS NULL`);
        
        // Modify name column to add length constraint
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "name" TYPE character varying(255)`);
        
        // Modify email column to add length constraint
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" TYPE character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL`);
    }

}
