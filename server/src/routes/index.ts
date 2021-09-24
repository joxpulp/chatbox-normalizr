import { Router } from 'express';
import messagesRouter from './messages';

const router = Router();

router.use('/mensajes', messagesRouter)

export default router;