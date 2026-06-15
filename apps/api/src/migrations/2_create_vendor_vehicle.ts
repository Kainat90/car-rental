import { DataSource } from "typeorm";

export const up = async (db: DataSource) => {
    await db.query(`
        CREATE TYPE "vehicle_type_enum" AS ENUM ('sedan', 'suv', 'truck', 'hatchback');
        CREATE TYPE "vehicle_status_enum" AS ENUM ('available', 'unavailable');
        CREATE TYPE "transmission_type_enum" AS ENUM ('automatic', 'manual');
        CREATE TYPE "fuel_type_enum" AS ENUM ('petrol', 'diesel', 'electric', 'hybrid');

        CREATE TABLE "vendor_vehicles" (
            id SERIAL PRIMARY KEY,
            vendor_id INTEGER NOT NULL,
            make VARCHAR(255) NOT NULL,
            model VARCHAR(255) NOT NULL,
            year INTEGER NOT NULL,
            type vehicle_type_enum NOT NULL,
            plate_number VARCHAR(255) NOT NULL UNIQUE,
            status vehicle_status_enum NOT NULL DEFAULT 'unavailable',
            price_per_day DECIMAL(10, 2) NOT NULL,
            city VARCHAR(255) NOT NULL,
            color VARCHAR(255),
            transmission transmission_type_enum,
            fuel_type fuel_type_enum,
            seats INTEGER,
            mileage INTEGER,
            description TEXT,
            images JSON,
            is_verified BOOLEAN NOT NULL DEFAULT false,
            created_at TIMESTAMP DEFAULT now(),
            updated_at TIMESTAMP DEFAULT now()
        )
    `)
}

export const down = async (db: DataSource) => {
    await db.query(`
        DROP TABLE IF EXISTS "vendor_vehicles";
        DROP TYPE IF EXISTS "vehicle_type_enum";
        DROP TYPE IF EXISTS "vehicle_status_enum";
        DROP TYPE IF EXISTS "transmission_type_enum";
        DROP TYPE IF EXISTS "fuel_type_enum";
    `)
}