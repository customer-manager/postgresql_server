import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.authService.create(req.body as User);
      res.status(201).json(user); // Bu satırda `void` döndürülüyor
    } catch (error) {
      res.status(400).json({ error: error.message }); // Bu satırda `void` döndürülüyor
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { username, password } = req.body;
    try {
      const user = await this.authService.findByUsername(username);
      if (!user) return res.status(401).json({ message: 'User not found' });

      const isValid = await this.authService.validatePassword(user, password);
      if (!isValid) return res.status(401).json({ message: 'Invalid password' });

      const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '10h' });
      const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      // Save refreshToken in database (pseudo-code)
      await this.authService.saveRefreshToken(user.id, refreshToken);

      res.json({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.body;
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET) as { id: string };
      const newAccessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ accessToken: newAccessToken });
    } catch (error) {
      res.status(401).json({ message: 'Invalid token.' });
    }
  }

  async me(req: Request, res: Response): Promise<void> {
    if (req.user) {
      res.json(req.user); // Bu satırda `void` döndürülüyor
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
