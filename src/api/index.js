import { Router } from 'express';

import { api, request } from '../middlewares';
import subscribe from './subscribe';


const middlewares = [request, api];
const router = Router();

// Endpoints
router.post('/subscribe', ...middlewares, subscribe);

export default router;
