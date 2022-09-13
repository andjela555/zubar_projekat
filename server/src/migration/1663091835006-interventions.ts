import { MigrationInterface, QueryRunner } from "typeorm";

export class interventions1663091835006 implements MigrationInterface {
    name = 'interventions1663091835006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`intervention_item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`interventionId\` int NOT NULL, \`price\` int NOT NULL, \`serviceId\` int NULL, PRIMARY KEY (\`id\`, \`interventionId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`intervention\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`status\` enum ('pending', 'accepted', 'rejected', 'finished') NOT NULL, \`start\` datetime NOT NULL, \`end\` datetime NULL, \`userId\` int NULL, \`dentistId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`intervention_item\` ADD CONSTRAINT \`FK_36b62b7733222d413574b758e84\` FOREIGN KEY (\`serviceId\`) REFERENCES \`service\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`intervention_item\` ADD CONSTRAINT \`FK_aee366c15cd823ed9feb11d5446\` FOREIGN KEY (\`interventionId\`) REFERENCES \`intervention\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`intervention\` ADD CONSTRAINT \`FK_67ce728766165b5ba9e9e6a5517\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`intervention\` ADD CONSTRAINT \`FK_51a3a66babc6d64ede6d08d8b99\` FOREIGN KEY (\`dentistId\`) REFERENCES \`dentist\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`intervention\` DROP FOREIGN KEY \`FK_51a3a66babc6d64ede6d08d8b99\``);
        await queryRunner.query(`ALTER TABLE \`intervention\` DROP FOREIGN KEY \`FK_67ce728766165b5ba9e9e6a5517\``);
        await queryRunner.query(`ALTER TABLE \`intervention_item\` DROP FOREIGN KEY \`FK_aee366c15cd823ed9feb11d5446\``);
        await queryRunner.query(`ALTER TABLE \`intervention_item\` DROP FOREIGN KEY \`FK_36b62b7733222d413574b758e84\``);
        await queryRunner.query(`DROP TABLE \`intervention\``);
        await queryRunner.query(`DROP TABLE \`intervention_item\``);
    }

}
