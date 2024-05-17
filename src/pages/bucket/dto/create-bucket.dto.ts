import { VisibilityType } from '@bnb-chain/greenfield-js-sdk';
import { IsEnum, IsString } from 'class-validator';

export class CreateBucketDto {
  @IsString()
  name: string;

  @IsEnum(VisibilityType)
  visibility: VisibilityType;

  @IsString()
  creator: string;

  @IsString()
  paymentAddress: string;
}
