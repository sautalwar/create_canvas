import { Router } from 'express';
import itemsRouter from './items';
import searchRouter from './search';
import deleteRouter from './delete';
import shoesRouter from './shoes';
import cartRouter from './cart';

const router = Router();

router.use('/items', itemsRouter);
router.use('/inventory', searchRouter);
router.use('/inventory', deleteRouter);
router.use('/shoes', shoesRouter);
router.use('/cart', cartRouter);

// NOTE: No /health endpoint exists yet — this is intentional.
// A health check endpoint should be added for production readiness.

export default router;
