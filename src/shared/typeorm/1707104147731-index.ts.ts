import { MigrationInterface, QueryRunner } from "typeorm";

export class Index.ts1707104147731 implements MigrationInterface {
    name = 'Index.ts1707104147731'

    public async up(queryRunner: QueryRunner): Promise < void> {
        await queryRunner.query(`CREATE TABLE "Car" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "licensePlate" character varying NOT NULL, "color" character varying NOT NULL, "brand" character varying NOT NULL, CONSTRAINT "PK_fb79b6611661f82766162486acd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Driver" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_9b78eddc1b0c643ec4e956eaac5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "CarUse" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startDate" TIMESTAMP NOT NULL DEFAULT now(), "finalDate" TIMESTAMP, "reason" character varying NOT NULL, "carId" uuid NOT NULL, "driverId" uuid NOT NULL, CONSTRAINT "REL_b74a341cde81933890beb4d4ff" UNIQUE ("carId"), CONSTRAINT "REL_51068d3289d646b80afd61e2e8" UNIQUE ("driverId"), CONSTRAINT "PK_a65e72940909a8d43270317dfa5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "CarUse" ADD CONSTRAINT "FK_b74a341cde81933890beb4d4ffa" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CarUse" ADD CONSTRAINT "FK_51068d3289d646b80afd61e2e87" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise < void> {
        await queryRunner.query(`ALTER TABLE "CarUse" DROP CONSTRAINT "FK_51068d3289d646b80afd61e2e87"`);
        await queryRunner.query(`ALTER TABLE "CarUse" DROP CONSTRAINT "FK_b74a341cde81933890beb4d4ffa"`);
        await queryRunner.query(`DROP TABLE "CarUse"`);
        await queryRunner.query(`DROP TABLE "Driver"`);
        await queryRunner.query(`DROP TABLE "Car"`);
    }

}
