import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { jwtConstants } from 'src/auth/constants';
import { jwtDto } from './DTO/authDto';

interface MyRequest extends Request {
  userInformation?: jwtDto;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService){}

  use(req: MyRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token)
    {
        return res.status(401).json(
            { message: 'Token de autorización no proporcionado' }
        );
    }

   const payload = this.validateToken(token);
   req.userInformation = payload as jwtDto;

    next();
  }

  private validateToken(token: string): any {
    try {
      return this.jwtService.verify(token, { secret: jwtConstants.secret });
    } catch (e) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}