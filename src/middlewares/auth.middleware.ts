import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
        if (err)
          return res.status(401).json({
            success: false,
            message: 'Unauthorized',
          });
        next();
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }
  }
}
