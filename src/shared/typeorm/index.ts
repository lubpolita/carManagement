/* eslint-disable import/no-extraneous-dependencies */
import 'dotenv/config';
import { DataSource } from 'typeorm';

const isTestEnvironment = process.env.NODE_ENV === 'test';

export const dataSource = new DataSource({
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: isTestEnvironment ? 5433 : 5432,
  username: 'postgres',
  password: isTestEnvironment ? 'docker' : '12345',
  database: isTestEnvironment ? 'oni' : 'postgres',
  synchronize: false,
  logging: false,
  migrationsTableName: 'migration',
  entities: ['src/shared/typeorm/entities/*.ts'],
  migrations: ['src/shared/typeorm/migrations/*.ts'],
});
