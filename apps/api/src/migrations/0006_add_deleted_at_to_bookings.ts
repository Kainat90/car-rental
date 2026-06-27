import { DataSource } from "typeorm";

export const up = async (db: DataSource) => {
    await db.query(`
        ALTER TABLE "bookings"
        ADD COLUMN deleted_at TIMESTAMP;
    `);
};

export const down = async (db: DataSource) => {
    await db.query(`
        ALTER TABLE "bookings"
        DROP COLUMN deleted_at;
    `);
};