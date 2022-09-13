import { MigrationInterface, QueryRunner } from "typeorm";

export class ordinations1663090730523 implements MigrationInterface {
    name = 'ordinations1663090730523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ordination\` (\`id\` int NOT NULL AUTO_INCREMENT, \`address\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`dentist\` ADD \`ordinationId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`dentist\` ADD CONSTRAINT \`FK_b733df2469e483b7ff2e418ae68\` FOREIGN KEY (\`ordinationId\`) REFERENCES \`ordination\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dentist\` DROP FOREIGN KEY \`FK_b733df2469e483b7ff2e418ae68\``);
        await queryRunner.query(`ALTER TABLE \`dentist\` DROP COLUMN \`ordinationId\``);
        await queryRunner.query(`DROP TABLE \`ordination\``);
    }

}
