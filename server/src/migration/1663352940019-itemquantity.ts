import { MigrationInterface, QueryRunner } from "typeorm";

export class itemquantity1663352940019 implements MigrationInterface {
    name = 'itemquantity1663352940019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`intervention_item\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`intervention_item\` ADD \`unitPrice\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`intervention_item\` ADD \`quantity\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`intervention_item\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`intervention_item\` DROP COLUMN \`unitPrice\``);
        await queryRunner.query(`ALTER TABLE \`intervention_item\` ADD \`price\` int NOT NULL`);
    }

}
