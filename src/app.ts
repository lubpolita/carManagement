import express from 'express';
import 'reflect-metadata';
import './shared/infra/container';
import routes from './shared/infra/http/routes';

const app = express();
app.use(express.json());
app.use(routes);

export default app;
