import { IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  wallet: string;

  @IsString()
  nonce: string;
}
