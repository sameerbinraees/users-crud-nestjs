import { PartialType } from '@nestjs/mapped-types';
import { SignupDto } from './signup.dto.js';

export class LoginDto extends PartialType(SignupDto) {}
