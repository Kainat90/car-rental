import { DataSource } from "typeorm";

export const up = async (db: DataSource) => {
    await db.query(`
        CREATE TYPE "user_type_enum" AS ENUM ('customer', 'vendor', 'superadmin');
        CREATE TYPE "status_enum" AS ENUM ('active', 'inactive', 'banned');
        CREATE TYPE "registration_type_enum" AS ENUM ('online', 'walk_in');

        CREATE TABLE "users" (
            id SERIAL PRIMARY KEY,
            user_type user_type_enum NOT NULL,
            status status_enum NOT NULL DEFAULT 'active',
            registration_type registration_type_enum,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255),
            email VARCHAR(255) NOT NULL UNIQUE,
            phone VARCHAR(255),
            cnic VARCHAR(255) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            registered_by INTEGER,
            approved_by INTEGER,
            business_name VARCHAR(255),
            approved_at TIMESTAMP,
            created_at TIMESTAMP DEFAULT now()
        )
    `)
}

export const down = async (db: DataSource) => {
    await db.query(`
        DROP TABLE IF EXISTS "users";
        DROP TYPE IF EXISTS "user_type_enum";
        DROP TYPE IF EXISTS "status_enum";
        DROP TYPE IF EXISTS "registration_type_enum";
    `)
}