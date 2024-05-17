import { IsString } from 'class-validator';
import { SiweMessage } from 'siwe';

export class VerifyNonceDto {
  message: Partial<SiweMessage>;

  @IsString()
  signature: string;
}
