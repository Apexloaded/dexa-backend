import { VisibilityType } from '@bnb-chain/greenfield-js-sdk';
import { IsEnum, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  content: string;

  @IsString()
  visibility: string;

  @IsString()
  bucketName: string;
}
