import express from 'express';
import AccessControlController from '../controllers/AccessControlController.js';

const router = express.Router();


router.post('/', AccessControlController.createAccessControl);
router.put('/', AccessControlController.updateAccessControl);

export default router;
