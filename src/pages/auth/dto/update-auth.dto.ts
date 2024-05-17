import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  @IsBoolean()
  isOnboarded: boolean;

  @IsString()
  bioURI: string;

  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  profile: string;
}
