import { Router } from 'express';
import { authenticateUser } from "../middlewares/authMiddleware.js";
import * as ClimateControlController from '../controllers/climateControlController.js';

const router = Router();

router.post('/',authenticateUser, ClimateControlController.createClimateControl);
router.get('/:id',authenticateUser, ClimateControlController.getClimateControlById );
router.get('/home/:homeId', ClimateControlController.getClimateControlByHomeId); 
router.put('/:id',authenticateUser, ClimateControlController.updateClimateControl);
router.delete('/:id', authenticateUser, ClimateControlController.deleteClimateControl);

export default router;
