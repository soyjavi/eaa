import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';

import api from './src/api';
import {
  affiliates, dashboard, post, products, home,
} from './src/views';
import { error, request } from './src/middlewares';
import crons from './src/crons';

dotenv.config();
const { PORT = 3000, TITLE } = process.env;

const app = express();
const server = http.createServer(app);

// -- Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.cookieParser());
app.use(cors());
app.use(compression());
// -- Statics
app.use('/static', express.static('public'));
app.use(express.static('dist'));
// -- Middlewares
app.use(request);
// -- API
app.use('/api', api);
// -- Services
app.get('/afiliados', affiliates);
app.get('/productos', products);
app.get('/dashboard', dashboard);
app.get('/:postUri', post);
app.get('/', home);
// -- Error handler
app.use(error);

const listener = server.listen(PORT, () => {
  console.log(`"${TITLE}" is ready on port ${listener.address().port}`);
  crons.start();
});

['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'uncaughtException', 'SIGTERM'].forEach((eventType) => {
  process.on(eventType, () => {
    crons.stop();
    server.close();
    process.exit();
  });
});
