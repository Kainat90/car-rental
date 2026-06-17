import { DataSource } from "typeorm";
import dotenv from 'dotenv'
import { User } from "../modules/user/entity/user.entity";
import { Document } from "../documents/entity/document.entity";
dotenv.config()

//update entities array
export const AppDataSource = new DataSource ({
type:'postgres',
host:'localhost',
username: 'postgres',
password: process.env.DB_PASSWORD,
database: 'car_rental',
synchronize: false,
logging: true,
entities: [User, Document],
migrations: ['src/migration/*.ts']
})