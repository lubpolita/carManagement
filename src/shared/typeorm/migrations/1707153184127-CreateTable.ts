import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1707153184127 implements MigrationInterface {
    name = 'CreateTable1707153184127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Driver" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_9b78eddc1b0c643ec4e956eaac5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Car" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "licensePlate" character varying NOT NULL, "color" character varying NOT NULL, "brand" character varying NOT NULL, CONSTRAINT "PK_fb79b6611661f82766162486acd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "CarUse" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startDate" TIMESTAMP NOT NULL DEFAULT now(), "finalDate" TIMESTAMP, "reason" character varying NOT NULL, "carId" character varying NOT NULL, "driverId" character varying NOT NULL, CONSTRAINT "PK_a65e72940909a8d43270317dfa5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "CarUse"`);
        await queryRunner.query(`DROP TABLE "Car"`);
        await queryRunner.query(`DROP TABLE "Driver"`);
    }

}
