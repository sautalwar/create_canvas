import { Router } from 'express';
import itemsRouter from './items';

const router = Router();

router.use('/items', itemsRouter);

// NOTE: No /health endpoint exists yet — this is intentional.
// A health check endpoint should be added for production readiness.

export default router;
