import { DataSource } from "typeorm";

export const up = async (db: DataSource) => {
    await db.query(`
        CREATE TYPE "doc_type_enum" AS ENUM ('cnic', 'vehicle_registration');
        CREATE TYPE "doc_status_enum" AS ENUM ('pending', 'approved', 'rejected');

        CREATE TABLE "documents" (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            doc_type doc_type_enum NOT NULL,
            file_url VARCHAR(255) NOT NULL,
            status doc_status_enum NOT NULL DEFAULT 'pending',
            approved_by INTEGER,
            created_at TIMESTAMP DEFAULT now(),
            uploaded_at TIMESTAMP DEFAULT now(),

            CONSTRAINT fk_document_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            CONSTRAINT fk_document_approver FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL
        )
    `)
}

export const down = async (db: DataSource) => {
    await db.query(`
        DROP TABLE IF EXISTS "documents";
        DROP TYPE IF EXISTS "doc_type_enum";
        DROP TYPE IF EXISTS "doc_status_enum";
    `)
}