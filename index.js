import dotenv from 'dotenv';
import express from 'express';

import {
  timeline, trends,
} from './src/api';
import {
  affiliates, dashboard, post, products, home,
} from './src/services';
import { error, request } from './src/middlewares';
import crons from './src/crons';

dotenv.config();
const { PORT = 3000, TITLE } = process.env;

const app = express();
// -- Statics
app.use(express.static('public'));
app.use(express.static('dist'));
// -- Middlewares
app.use(request);
// -- API
app.get('/api/timeline', timeline);
app.get('/api/trends', trends);
// -- Services
app.get('/afiliados', affiliates);
app.get('/productos', products);
app.get('/dashboard', dashboard);
app.get('/:postUri', post);
app.get('/', home);
// -- Error handler
app.use(error);

const listener = app.listen(PORT, () => {
  console.log(`"${TITLE}" is ready on port ${listener.address().port}`);
});
