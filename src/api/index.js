import { Router } from 'express';

import { api, request } from '../middlewares';
import subscribe from './subscribe';
import traderbot from './traderbot';


const middlewares = [request, api];
const router = Router();

// Endpoints
router.post('/traderbot', ...middlewares, traderbot);
router.post('/subscribe', ...middlewares, subscribe);

export default router;
