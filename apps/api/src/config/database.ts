import { DataSource } from "typeorm";
import dotenv from 'dotenv'
import { User } from "../modules/user/entity/user.entity";

dotenv.config()

//update entities array
export const AppDataSource = new DataSource ({
type:'postgres',
host:'localhost',
username: 'postgres',
password: process.env.DB_PASSWORD,
database: 'car_rental_db',
synchronize: false,
logging: true,
entities: [User],
migrations: ['src/migration/*.ts']
})