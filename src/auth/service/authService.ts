import { Injectable, UnauthorizedException  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { jwtDto } from '../DTO/authDto';


@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: jwtDto): string {
    return this.jwtService.sign(payload);
  }

  validateToken(token: string): any {
    try {
      return this.jwtService.verify(token, { secret: jwtConstants.secret });
    } catch (e) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}