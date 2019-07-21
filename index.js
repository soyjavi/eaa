import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
// import fs from 'fs';
import http from 'http';
// import https from 'https';

import admin from './src/admin';
import api from './src/api';
import {
  affiliates, dashboard, post, product, products, home,
} from './src/views';
import { error, request } from './src/middlewares';
import crons from './src/crons';

dotenv.config();
const { PORT = 3000 } = process.env;

const app = express();
const server = http.createServer(app);
// const server = https.createServer({
//   key: fs.readFileSync('./ssl/activistafinanciero_com.key', 'utf8'),
//   cert: fs.readFileSync('./ssl/activistafinanciero_com.crt', 'utf8'),
//   ca: fs.readFileSync('./ssl/activistafinanciero_com.ca-bundle', 'utf8'),
// }, app);

// -- Configuration
// app.set('trust proxy', true);
// app.use((req, res, next) => {
//   if (!req.secure) return res.redirect(`https://${req.get('host')}${req.url}`);
//   next();
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());
// -- Statics
app.use('/static', express.static('public'));
app.use(express.static('dist'));
// -- Middlewares
app.use(request);
// -- Admin
app.use('/admin', admin);
// -- API
app.use('/api', api);
// -- Services
app.get('/afiliados', affiliates);
app.get('/productos', products);
app.get('/dashboard', dashboard);
app.get('/:product(traderbot|curso-trading|reporte)', product);
app.get('/:postUri', post);
app.get('/', home);
// -- Error handler
app.use(error);

const listener = server.listen(PORT, () => {
  console.log(`activistafinanciero.com is ready on port ${listener.address().port}`);
  crons.start();
});

['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'uncaughtException', 'SIGTERM'].forEach((eventType) => {
  process.on(eventType, () => {
    crons.stop();
    // server.close();
    process.exit();
  });
});
