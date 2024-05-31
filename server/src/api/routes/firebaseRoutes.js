import express from 'express';
import { getDht22Data } from '../services/firebaseService.js';

const router = express.Router();

router.get('/dht-22', getDht22Data);

export default router;
