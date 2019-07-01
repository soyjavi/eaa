import dotenv from 'dotenv';
import fs from 'fs';
import express from 'express';

import {
  affiliates, dashboard, post, home,
} from './src/services';
import { error, request } from './src/middlewares';

dotenv.config();
const { PORT = 3000, TITLE } = process.env;

const app = express();
// -- Statics
app.use(express.static('public'));
app.use(express.static('dist'));
// -- Middlewares
app.use(request);
// -- Services
app.get('/afiliados', affiliates);
app.get('/dashboard', dashboard);
app.get('/:postUri', post);
app.get('/', home);
// -- Error handler
app.use(error);

const listener = app.listen(PORT, () => {
  console.log(`"${TITLE}" is ready on port ${listener.address().port}`);
});
