import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ValidateJWTMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) throw new BadRequestException('Token not found!');

      const user = await this.jwtService.verify(token);
      if (!user) throw new UnauthorizedException('Invalid token!');
      next();
    } catch (error) {
      if (error.name == 'JsonWebTokenError')
        throw new UnauthorizedException('Invalid token!');
      throw new InternalServerErrorException(error.message);
    }
  }
}
