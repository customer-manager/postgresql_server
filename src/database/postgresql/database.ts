import { DataSource } from 'typeorm';
import { UserEntity } from '../../models/user.model'
import { CustomerEntity } from '../../models/customer.model';
import dotenv from 'dotenv';

dotenv.config(); 

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  url: `${process.env.POSTGRES_URL}`, 
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [UserEntity, CustomerEntity],
  synchronize: false,
});
