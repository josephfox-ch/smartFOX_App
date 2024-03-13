import express from 'express';
import AuthController from '../controllers/authController.js'
import passport from '../../config/passport.js'

const router = express.Router();


router.post('/register',AuthController.register)
router.post('/login',AuthController.login)



export default router;