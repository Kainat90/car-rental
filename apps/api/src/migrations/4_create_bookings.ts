import { DataSource } from "typeorm";

export const up = async (db: DataSource) => {
    await db.query(`
        CREATE TYPE "booking_status_enum" AS ENUM (
            'pending',
            'confirmed',
            'active',
            'completed',
            'cancelled',
            'rejected',
            'timed_out'
        );

        CREATE TABLE "bookings" (
            id SERIAL PRIMARY KEY,
            customer_id INTEGER NOT NULL,
            vendor_vehicle_id INTEGER NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            status booking_status_enum NOT NULL DEFAULT 'pending',
            cancelled_by INTEGER,
            cancellation_reason VARCHAR(500),
            confirmed_at TIMESTAMP,
            cancelled_at TIMESTAMP,
            created_at TIMESTAMP DEFAULT now(),
            updated_at TIMESTAMP DEFAULT now(),

            CONSTRAINT fk_booking_customer
                FOREIGN KEY (customer_id)
                REFERENCES users(id)
                ON DELETE RESTRICT,

            CONSTRAINT fk_booking_vendor_vehicle
                FOREIGN KEY (vendor_vehicle_id)
                REFERENCES vendor_vehicles(id)
                ON DELETE RESTRICT,

            CONSTRAINT fk_booking_cancelled_by
                FOREIGN KEY (cancelled_by)
                REFERENCES users(id)
                ON DELETE SET NULL,

            CONSTRAINT chk_booking_dates
                CHECK (end_date >= start_date)
        );

        CREATE INDEX idx_bookings_vendor_vehicle_dates
            ON bookings(vendor_vehicle_id, start_date, end_date);

        CREATE INDEX idx_bookings_customer_id
            ON bookings(customer_id);

        CREATE INDEX idx_bookings_status
            ON bookings(status);
    `);
};

export const down = async (db: DataSource) => {
    await db.query(`
        DROP TABLE IF EXISTS "bookings";
        DROP TYPE IF EXISTS "booking_status_enum";
    `);
};