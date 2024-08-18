import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { authenticateToken } from '../comman/middlewares/auth.middleware'

const authRouter = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

authRouter.post('/register', authController.register.bind(authController));
authRouter.post('/login', authController.login.bind(authController));
authRouter.post('/refresh', authController.refresh.bind(authController));
authRouter.get('/me', authenticateToken, authController.me.bind(authController));

export default authRouter;
