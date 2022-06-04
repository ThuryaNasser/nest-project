import { MigrationInterface, QueryRunner } from 'typeorm';

//Creating a TypeOrm Migration :npx typeorm migration:create src/migrations/TeaRefactor

export class TeaRefactor1654375238934 implements MigrationInterface {
  //Up : what need to be changed and how
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tea" RENAME COLUMN "name" TO "title"`,
    );
  }

  //Down : undo or roll back any changes
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tea" RENAME COLUMN "title" TO "name"`,
    );
  }
}
