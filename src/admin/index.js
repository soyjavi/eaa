import { Router } from 'express';

import { admin, request } from '../middlewares';
import posts from './posts';
import traderbot from './traderbot';
import subscribers from './subscribers';

const middlewares = [request, admin];
const router = Router();

// Endpoints
router.get('/posts', ...middlewares, posts);
router.get('/traderbot', ...middlewares, traderbot);
router.get('/subscribers', ...middlewares, subscribers);

export default router;
