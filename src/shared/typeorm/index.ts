import { DataSource } from 'typeorm';
import 'dotenv/config';

export const dataSource = new DataSource({
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345',
  database: 'postgres',
  synchronize: false,
  logging: false,
  migrationsTableName: 'migration',
  entities: ['src/shared/typeorm/entities/*.ts'],
  migrations: ['src/shared/typeorm/migrations/*.ts'],
});

