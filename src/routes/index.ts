import { Router } from 'express';
import itemsRouter from './items';
import searchRouter from './search';

const router = Router();

router.use('/items', itemsRouter);
router.use('/inventory', searchRouter);

// NOTE: No /health endpoint exists yet — this is intentional.
// A health check endpoint should be added for production readiness.

export default router;
