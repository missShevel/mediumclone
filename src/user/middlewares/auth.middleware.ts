import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { UserService } from '../user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];
    try {
      const decode = verify(token, JWT_SECRET);
      const user = await this.userService.findById(decode.id);
      req.user = user;
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  }
}
