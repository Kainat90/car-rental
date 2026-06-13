import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1781335107688 implements MigrationInterface {
    name = 'Migration1781335107688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."users_email_key"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "first_name" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_name" character varying`);
        await queryRunner.query(`ALTER TYPE "public"."UserType" RENAME TO "UserType_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_user_type_enum" AS ENUM('customer', 'vendor', 'superadmin')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_type" TYPE "public"."users_user_type_enum" USING "user_type"::"text"::"public"."users_user_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."UserType_old"`);
        await queryRunner.query(`ALTER TYPE "public"."UserStatus" RENAME TO "UserStatus_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_status_enum" AS ENUM('active', 'inactive', 'banned')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" TYPE "public"."users_status_enum" USING "status"::"text"::"public"."users_status_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'active'`);
        await queryRunner.query(`DROP TYPE "public"."UserStatus_old"`);
        await queryRunner.query(`ALTER TYPE "public"."RegistrationType" RENAME TO "RegistrationType_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_registration_type_enum" AS ENUM('online', 'walk_in')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "registration_type" TYPE "public"."users_registration_type_enum" USING "registration_type"::"text"::"public"."users_registration_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."RegistrationType_old"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cnic"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "cnic" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_d0a4a8c53cc33a8ada65036767b" UNIQUE ("cnic")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password_hash"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password_hash" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "business_name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "business_name" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "approved_at" TYPE TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" TYPE TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" TYPE TIMESTAMP(3)`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "approved_at" TYPE TIMESTAMP(3)`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "business_name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "business_name" text`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password_hash"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password_hash" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_d0a4a8c53cc33a8ada65036767b"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cnic"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "cnic" text`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" text`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" text NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."RegistrationType_old" AS ENUM('online', 'walk_in')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "registration_type" TYPE "public"."RegistrationType_old" USING "registration_type"::"text"::"public"."RegistrationType_old"`);
        await queryRunner.query(`DROP TYPE "public"."users_registration_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."RegistrationType_old" RENAME TO "RegistrationType"`);
        await queryRunner.query(`CREATE TYPE "public"."UserStatus_old" AS ENUM('active', 'inactive', 'banned')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" TYPE "public"."UserStatus_old" USING "status"::"text"::"public"."UserStatus_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'active'`);
        await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."UserStatus_old" RENAME TO "UserStatus"`);
        await queryRunner.query(`CREATE TYPE "public"."UserType_old" AS ENUM('customer', 'vendor', 'superadmin')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_type" TYPE "public"."UserType_old" USING "user_type"::"text"::"public"."UserType_old"`);
        await queryRunner.query(`DROP TYPE "public"."users_user_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."UserType_old" RENAME TO "UserType"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "first_name"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "users_email_key" ON "users" USING btree ("email") `);
    }

}
