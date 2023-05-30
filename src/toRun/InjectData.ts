import { MigrationInterface, QueryRunner } from 'typeorm'

import { UserEntity } from '../models/user.entity'
import { RoleEnumType, StatusEnumType } from '../utils/enums'
import { DriverEntity } from '../models/driver.entity'

export class Migrations1685405382824 implements MigrationInterface {
   name: 'Migrations1685405382824'

   public async down(queryRunner: QueryRunner): Promise<void> {}

   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
         "INSERT INTO users (id, email, password, role) VALUES ('4ce17eae-fe7a-11ed-be56-0242ac120002', 'tempmail@driver.com', '$2a$10$VJLK5Cbfc6f1DRjgiQPV6ODcEslZPfVc50i7fBiWGRbPL3P8nDaoS', 'driver' ) "
      )

      await queryRunner.query(
         "INSERT INTO users (id, email, password, role) VALUES ('a4b11f60-fe7d-11ed-be56-0242ac120002', 'tempmail1@driver.com', '$2a$10$VJLK5Cbfc6f1DRjgiQPV6ODcEslZPfVc50i7fBiWGRbPL3P8nDaoS', 'driver' ) "
      )

      await queryRunner.query(
         "INSERT INTO users (id, email, password, role) VALUES ('a9fef8f2-fe7d-11ed-be56-0242ac120002', 'tempmail2@rider.com', '$2a$10$VJLK5Cbfc6f1DRjgiQPV6ODcEslZPfVc50i7fBiWGRbPL3P8nDaoS', 'rider' ) "
      )

      await queryRunner.query(
         "INSERT INTO users (id, email, password, role) VALUES ('ae7d1a44-fe7d-11ed-be56-0242ac120002', 'tempmail3@rider.com', '$2a$10$VJLK5Cbfc6f1DRjgiQPV6ODcEslZPfVc50i7fBiWGRbPL3P8nDaoS', 'rider' ) "
      )

      // 2 drivers available

      await queryRunner.query(
         "INSERT INTO drivers (id, user_id, status) VALUES ('c2dc2bfe-fe7a-11ed-be56-0242ac120002', '4ce17eae-fe7a-11ed-be56-0242ac120002', 'available' ) "
      )

      await queryRunner.query(
         "INSERT INTO drivers (id, user_id, status) VALUES ('c2dc2bfe-fe7a-11ed-be56-0242ac120003', 'a4b11f60-fe7d-11ed-be56-0242ac120002', 'available' ) "
      )

      // 2 riders available
      await queryRunner.query(
         `INSERT INTO riders (id, "userId", "currentUbication", status) VALUES ('c2dc2bfe-fe7a-11ed-be56-0242ac120004', 'a9fef8f2-fe7d-11ed-be56-0242ac120002', '{ lat: 40, long: -20 }', 'available' ) `
      )

      await queryRunner.query(
         `INSERT INTO riders (id, "userId", "currentUbication", status) VALUES ('c2dc2bfe-fe7a-11ed-be56-0242ac120005', 'ae7d1a44-fe7d-11ed-be56-0242ac120002', '{ lat: 50, long: -20 }', 'available' ) `
      )
   }
}
