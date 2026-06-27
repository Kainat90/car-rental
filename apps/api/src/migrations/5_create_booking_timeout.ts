import { DataSource } from "typeorm";

export const up = async (db:DataSource)=> {
await db.query(`
    CREATE TABLE "booking_timeouts"(
    id SERIAL PRIMARY KEY,
    booking_id INTEGER NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    cancelled_at TIMESTAMP NULL,
    customer_notified_at TIMESTAMP NULL,


    CONSTRAINT fk_booking_timeout_booking
    FOREIGN KEY (booking_id)
    REFERENCES bookings(id)
    ON DELETE RESTRICT
)
    
    `)

}

export const down = async (db: DataSource) => {
    await db.query(`
        DROP TABLE IF EXISTS "booking_timeouts";
       
    `);
};
