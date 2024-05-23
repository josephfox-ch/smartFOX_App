
import express from 'express';
import { getDoors, updateDoor, updateAllDoors } from '../controllers/doorController.js';

const router = express.Router();

router.get('/:homeId', getDoors);
router.put('/:doorId', updateDoor);
router.put('/:homeId/doors', updateAllDoors);

export default router;
