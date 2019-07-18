import { Router } from 'express';

import { api, request } from '../middlewares';
// -- public
import order from './order';
import payment from './payment';
import subscribe from './subscribe';
// -- secure
import traderbot from './traderbot';


const middlewares = [request, api];
const router = Router();

// Endpoints
router.post('/order', ...middlewares, order);
router.get('/payment', ...middlewares, payment);
router.post('/traderbot', ...middlewares, traderbot);
router.post('/subscribe', ...middlewares, subscribe);

export default router;
