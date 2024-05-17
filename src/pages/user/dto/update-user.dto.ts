import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  name?: string;
  username?: string;
  pfp?: string;
  banner?: string;
  bio?: string;
  isOnboarded?: boolean;
  website?: string;
}
