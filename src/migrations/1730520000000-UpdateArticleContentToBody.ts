import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateArticleContentToBody1730520000000 implements MigrationInterface {
    name = 'UpdateArticleContentToBody1730520000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Check if content column exists
        const contentColumnExists = await queryRunner.hasColumn("article", "content");
        
        if (contentColumnExists) {
            // Add body column first
            await queryRunner.query(`ALTER TABLE "article" ADD "body" text`);
            
            // Copy data from content to body
            await queryRunner.query(`UPDATE "article" SET "body" = "content"`);
            
            // Make body column NOT NULL
            await queryRunner.query(`ALTER TABLE "article" ALTER COLUMN "body" SET NOT NULL`);
            
            // Drop the content column
            await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "content"`);
        } else {
            // If content column doesn't exist, just ensure body column exists
            const bodyColumnExists = await queryRunner.hasColumn("article", "body");
            if (!bodyColumnExists) {
                await queryRunner.query(`ALTER TABLE "article" ADD "body" text NOT NULL`);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Check if body column exists
        const bodyColumnExists = await queryRunner.hasColumn("article", "body");
        
        if (bodyColumnExists) {
            // Add content column first
            await queryRunner.query(`ALTER TABLE "article" ADD "content" text`);
            
            // Copy data from body to content
            await queryRunner.query(`UPDATE "article" SET "content" = "body"`);
            
            // Make content column NOT NULL
            await queryRunner.query(`ALTER TABLE "article" ALTER COLUMN "content" SET NOT NULL`);
            
            // Drop the body column
            await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "body"`);
        }
    }
}
