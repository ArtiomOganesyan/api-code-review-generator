import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1680029038048 implements MigrationInterface {
  name = 'InitMigration1680029038048';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "mentor" boolean NOT NULL DEFAULT false, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "review" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "grade" integer NOT NULL, "userId" integer, "studentId" integer, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "student" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "groupId" integer, CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "group" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "phase" integer NOT NULL, "archive" boolean NOT NULL DEFAULT false, "campusId" integer, CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "teacher" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "campusId" integer, CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "campus" ("id" SERIAL NOT NULL, "location" character varying NOT NULL, CONSTRAINT "UQ_b393f9e053a70b5b9ead2f497da" UNIQUE ("location"), CONSTRAINT "PK_150aa1747b3517c47f9bd98ea6d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("expiredAt" bigint NOT NULL, "id" character varying(255) NOT NULL, "json" text NOT NULL, "destroyedAt" TIMESTAMP, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_28c5d1d16da7908c97c9bc2f74" ON "session" ("expiredAt") `,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_88abd13b683a17c1ff613a7846d" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ADD CONSTRAINT "FK_ce9660fc114efef4062bba4c119" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "group" ADD CONSTRAINT "FK_3922ffb7f36e870e8e8584a977a" FOREIGN KEY ("campusId") REFERENCES "campus"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" ADD CONSTRAINT "FK_4b07d4dd37f1c76d33421c62ed9" FOREIGN KEY ("campusId") REFERENCES "campus"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "teacher" DROP CONSTRAINT "FK_4b07d4dd37f1c76d33421c62ed9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group" DROP CONSTRAINT "FK_3922ffb7f36e870e8e8584a977a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" DROP CONSTRAINT "FK_ce9660fc114efef4062bba4c119"`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_88abd13b683a17c1ff613a7846d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_28c5d1d16da7908c97c9bc2f74"`,
    );
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(`DROP TABLE "campus"`);
    await queryRunner.query(`DROP TABLE "teacher"`);
    await queryRunner.query(`DROP TABLE "group"`);
    await queryRunner.query(`DROP TABLE "student"`);
    await queryRunner.query(`DROP TABLE "review"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
