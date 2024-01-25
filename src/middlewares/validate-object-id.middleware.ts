import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { UsersService } from '../users/users.service';

@Injectable()
export class ValidateObjectIdMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid user id passed!');
    if (!(await this.usersService.exists(id)))
      throw new NotFoundException('User with the given Id does not exist!');

    next();
  }
}
