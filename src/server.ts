/* eslint-disable import/no-extraneous-dependencies */
import { config } from 'dotenv';
import 'reflect-metadata';
import app from './app';
import { dataSource } from './shared/typeorm';

config();

dataSource.initialize().then(() => {
  app.listen(3333, () => {
    return console.log('Server started on port 3333.');
  });
});
